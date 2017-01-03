/**
 * Created by Darragh on 04/11/2016.
 */
var crd, clat, clong, currentLocation, map, here, zoom;
var stop = 'images/stop.png';
var markers = [];
var directionsService;
var directionsDisplay;
var nearest, nlat, nlong;
var distancetocurrent, distancetonearest;
var map;


//getting current location data from browser
navigator.geolocation.getCurrentPosition(success, error);

function success(pos) {
    //calculate location
    crd = pos.coords;
    clat = crd.latitude;
    clong = crd.longitude;
    //output to console(debugging)
    console.log('Your current position is:');
    console.log('Latitude : ' + clat);
    console.log('Longitude: ' + clong);
    console.log('Accurate to approx. ' + crd.accuracy + ' meters.');
    zoom = 17;

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    //setup map
    drawMap();
}

function error() {
    alert('Oops!');
}

function drawMap()
{
    console.log('Drawing Map');
    //get current location LatLang
    currentLocation = new google.maps.LatLng(clat, clong);
    //style the map
    var style = [
        {
            stylers: [
                { saturation: "-100" },
                { lightness: "20" }
            ]
        },{
            featureType: "poi",
            stylers: [{ visibility: "off" }]
        },{
            featureType: "transit",
            stylers: [{ visibility: "off" }]
        },{
            featureType: "road",
            stylers: [
                { lightness: "50" },
                { visibility: "on" }
            ]
        },{
            featureType: "landscape",
            stylers: [{ lightness: "50" }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '0, 0, 0, 0.5'}]
        }
    ]
    //set map options
    options =
    {
        zoom: zoom,
        center: currentLocation,
        disableDefaultUI: true,
        mapTypeId: 'hybrid',
        styles: style
    };
    //create new map with previous requirements/specs
    map = new google.maps.Map(document.getElementById("map"), options);
    //mark location on map with custom marker
    markCurrentLocation(map);
}

function markCurrentLocation(map) {
    //define marker image
    here = '/images/here.png';
    //define marker position
    var marker = new google.maps.Marker({
        //set position(current location variable passed here) & icon
        position: new google.maps.LatLng(clat, clong),
        map: map,
        icon: here,
        animation: google.maps.Animation.BOUNCE
    });
    //place marker
    marker.setMap(map);
}

function getRoute(routeNumber) {
    drawMap();
    closeMenu();
    toggleLoading();
    //get stop locations and draw the stops
    var data1 = $.getJSON('https://data.dublinked.ie/cgi-bin/rtpi/routeinformation?operator=be&routeid='+routeNumber)
    .done(function() {
        //mark all the outbound stops
        data1.responseJSON.results.forEach(function(leg) {
            var origin = leg.origin;
            var destination = leg.destination;
            distancetocurrent = 500000, distancetonearest = 500000;
            leg.stops.forEach(function(bus) {
                var busdue;

                /*//get stop times
                var data2 = $.getJSON('https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid='+ bus.stopid)
                .done(function() {
                    if(data2.responseJSON.results) {
                        busdue = data2.responseJSON.results[0].duetime;
                    }
                });*/

                var data = $.getJSON('https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid='+ bus.stopid, function( data ) {
                    if(data.results[0] != undefined) {
                        var content;

                        busdue = data.results[0].duetime;

                        if(busdue.indexOf(':') == -1 && busdue.indexOf('Due') == -1)
                            busdue += ' Minutes';

                        content = '<b>Stop Name: </b>'+bus.fullname + '<br /><b>Route: </b>'+origin+' to '+destination+'<br /><b>Next Bus: </b> ' + busdue;

                        var infoWindow = new google.maps.InfoWindow({
                            content: content
                        });

                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(bus.latitude, bus.longitude),
                            map: map,
                            animation: google.maps.Animation.DROP,
                            title: bus.fullname,
                            icon: stop
                        });
                        google.maps.event.addListener(marker, 'click', (function(infoWindow) {
                            return function() {
                                infoWindow.close();
                                infoWindow.open(map,this);
                            }
                        })(infoWindow));

                        marker.setMap(map);
                    }
                });
                //calculate distance between cuurent location and selected stop
                distancetocurrent = google.maps.geometry.spherical.computeDistanceBetween
                (
                    new google.maps.LatLng(clat,clong),
                    new google.maps.LatLng(bus.latitude,bus.longitude)
                );
                if(distancetocurrent < distancetonearest)
                {
                    distancetonearest = distancetocurrent;
                    nearest = bus.fullname;
                    nlat = bus.latitude;
                    nlong = bus.longitude;
                }
            });
        })
    })
    .done(function() {
        console.log("Nearest stop: "+nearest+" distance(mtrs): "+distancetocurrent);
    })
    .done(function() {
        //mark directions to nearest stop
        DisplayRouteToNearestStop(directionsService, directionsDisplay);
    })
    .done(function() {
        toggleLoading();
    });



}

function setZoom(direction){
    //if direction is true zoom in, otherwise zooom out
    direction ? zoom++ : zoom--;
    drawMap();
}

function DisplayRouteToNearestStop(directionsService, directionsDisplay)
{
    //TODO: find out which way user is going. Dont want to direct to outgoing stop when user is ingoing
    console.log("Drawing Directions to: "+nearest+". Lat: "+nlat+", Long: "+nlong);
    directionsService.route(
    {
        origin: new google.maps.LatLng(clat, clong),
        destination: new google.maps.LatLng(nlat, nlong),
        travelMode: google.maps.TravelMode.WALKING
    },  function(response, status)
    {
        if (status === google.maps.DirectionsStatus.OK)
        {
            directionsDisplay.setDirections(response);
        }
        else
        {
            window.alert('Directions request failed due to ' + status);
        }
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true } );

}
 function closeMenu() {
     //closing menu
     console.log('Closed menu!');
     $( "nav" ).toggleClass( "expanded" );
     $( "body" ).toggleClass( "nav-expanded" );
 }
function toggleLoading() {
    //closing menu
    console.log('Closed menu!');
    $( "#loader" ).toggleClass( "hide" );
}

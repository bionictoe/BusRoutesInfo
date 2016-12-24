/**
 * Created by Darragh on 04/11/2016.
 */
var crd, clat, clong, currentLocation, map, here, zoom;
var stop = 'images/stop.png';
var markers = [];
var directionsService;
var directionsDisplay;
var nearest, nlat, nlong;
var currentstopdistance;
var neareststopdistance;
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
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "transit",
            stylers: [
                { visibility: "off" }
            ]
        },{
            featureType: "road",
            stylers: [
                { lightness: "50" },
                { visibility: "on" }
            ]
        },{
            featureType: "landscape",
            stylers: [
                { lightness: "50" }
            ]
        }
    ]
    //set map options
    options =
    {
        zoom: zoom,
        center: currentLocation,
        disableDefaultUI: true,
        mapTypeId: 'hybrid'
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
    //clear the screen before drawing route
    clearMarkers();

    //get stop locations and draw the stops
    var data = $.getJSON('https://data.dublinked.ie/cgi-bin/rtpi/routeinformation?operator=be&routeid='+routeNumber, function (data) {
        console.log('Got all stops')
    })
    .done(function() {
        //mark all the outbound stops
        data.responseJSON.results.forEach(function(leg) {
            var origin = leg.origin;
            var destination = leg.destination;
            leg.stops.forEach(function(bus) {
                var infoWindow = new google.maps.InfoWindow({ content: '<b>Stop Name: </b>'+bus.fullname +'<br /><b>Route: </b>'+origin+' to '+destination });

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(bus.latitude, bus.longitude),
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: bus.fullname
                });
                google.maps.event.addListener(marker, 'click', (function(infoWindow) {
                    return function() {
                        infoWindow.close();
                        infoWindow.open(map,this);
                    }
                })(infoWindow));

                marker.setMap(map);
            });
        })
    })
    .done(function() {
        console.log("Nearest stop: "+nearest+" distance(mtrs): "+currentstopdistance);
    })
    .done(function() {
        //mark directions to nearest stop
        //DisplayRouteToNearestStop(directionsService, directionsDisplay);
    });



}

function clearMarkers() {
    for(var i=0; i < this.markers.length; i++){
        this.markers[i].setMap(null);
    }
    this.markers = new Array();
};

function setZoom(direction){
    //if direction is true zoom in, otherwise zooom out
    direction ? zoom++ : zoom--;
    drawMap();
    drawMarkers(map);
}

function DisplayRouteToNearestStop(directionsService, directionsDisplay)
{
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
    $('body').scrollTop(0);
}
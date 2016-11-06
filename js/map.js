/**
 * Created by Darragh on 04/11/2016.
 */
var crd, clat, clong, currentLocation, map, here, zoom;
var stop = 'images/stop.png';
var markers = [];



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

//pass in lat and long of stop
function markStop(lat, lon) {
    var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            animation: google.maps.Animation.DROP,
            icon: stop
    });
    //add marker to markers array
    markers.push(marker);
}

function getRoute(routeNumber) {
    var current = new google.maps.LatLng(clat, clong);
    //clear the screen before drawing route
    clearMarkers();
    //add markers to map
    drawMarkers(map);

    //get stop locations and draw the stops
    $.getJSON('json/'+routeNumber+'.json', function (data) {
        //mark all the outbound stops
        data.outbound.forEach(function(outbound) {
            markStop(outbound.latitude, outbound.longitude);
        });
        //mark all the inbound stops
        data.inbound.forEach(function(inbound) {
            markStop(inbound.latitude, inbound.longitude)
        });
    });
    console.log(markers);
    //draw stops on map
    drawMarkers(map);
}

function drawMarkers(routemap){
    for(var i = 0; i<markers.length; i++)
        markers[i].setMap(routemap);
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
/**
 * Created by Darragh on 04/11/2016.
 */
var crd, clat, clong, currentLocation;



//getting current location data from browser
navigator.geolocation.getCurrentPosition(function success(pos)
{
    //calculate location
    crd = pos.coords;
    clat = crd.latitude;
    clong = crd.longitude;
    //output to console(debugging)
    console.log('Your current position is:');
    console.log('Latitude : ' + clat);
    console.log('Longitude: ' + clong);
    console.log('Accurate to approx. ' + crd.accuracy + ' meters.');
    //setup map
    initMap();
});

function initMap() {
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
        zoom: 18,
        center: currentLocation,
        disableDefaultUI: true,
        mapTypeId: 'hybrid',
        styles: style
    };
    //create new map with previous requirements/specs
    var map = new google.maps.Map(document.getElementById("map"), options);
    //mark location on map with custom marker
    markCurrentLocation(map);
}

function markCurrentLocation(map)
{
    //define marker image
    var here = '/images/here.png';
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
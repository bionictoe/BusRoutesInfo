/**
 * Created by Darragh on 04/11/2016.
 */
    //choosing a route event handlers

        $('#401').click(function()
        {
            console.log('doing 401');
            getroute('401');
        });
        $('#402').click(function()
        {
            console.log('doing 402');
            getroute('402');
        });
        $('#403').click(function()
        {
            console.log('doing 403');
            getroute('403');
        });
        $('#405').click(function()
        {
            console.log('doing 405');
            getroute('405');
        });
        $('#407').click(function()
        {
            console.log('doing 407');
            getroute('407');
        });
        $('#409').click(function()
        {
            console.log('doing 409');
            getroute('409');
        });
        $('#410').click(function()
        {
            console.log('doing 410');
            getroute('410');
        });
        $('#all').click(function()
        {
            console.log('Getting all stops');
            getAllStops();
        });
        $('#clear').click(function()
        {
            console.log('clearing bus stops');
            map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
            initialize();
        });
        $('#clearDirections').click(function()
        {
            console.log('clearing directions');
            directionsDisplay.set('directions', null);
        });


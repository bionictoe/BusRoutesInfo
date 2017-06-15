<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Galway Bus Routes Info</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <!-- Styles -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">

    <!-- Javascript -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/js/jquery-3.1.1.min.js"><\/script>')</script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/jquery.navgoco.js"></script>
    <script src="js/nav.js"></script>
    <script src="js/map.js"></script>
    <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyBNKBi4b62hYCr4v4wKgZdV3rJdmJVrEXk&libraries=geometry"></script>
    <script src="js/routeClickHandlers.js"></script>

</head>
<body style="width: 100%;" >
<nav>
    <ul class="list-unstyled main-menu">

        <li class="text-right"><a href="#" id="nav-close">X</a></li>
        <li><a href="#" id="401" onclick="getRoute(401);">401	Salthill - Eyre Square <span class="icon"></span></a></li>
        <li><a href="#" id="402" onclick="getRoute(402);">402	Merlin Park - Eyre Square - Seacrest <span class="icon"></span></a></li>
        <li><a href="#" id="403" onclick="getRoute(403);">403	Eyre Square - Castlepark <span class="icon"></span></a></li>
        <li><a href="#" id="404" onclick="getRoute(404);">404	Newcastle - Eyre Square - Oranmore  <span class="icon"></span></a></li>
        <li><a href="#" id="405" onclick="getRoute(405);">405	Rahoon - Eyre Square - Ballybane <span class="icon"></span></a></li>
        <li><a href="#" id="407" onclick="getRoute(407);">407	Eyre Square - Bóthar an Chóiste and return <span class="icon"></span></a></li>
        <li><a href="#" id="410" onclick="getRoute(410);">409	Eyre Square - GMIT - Parkmore  <span class="icon"></span></a></li>
    </ul>
    <br>
    <center><button class="btn btn-primary all">Display All Stops</button> <button class="btn btn-primary clearAll" onclick="clearMarkers();">Clear Map</button></center>
    <br><br>
    <center><button class="btn btn-primary all" onclick="setZoom(true)">Zoom In</button><button class="btn btn-primary all" onclick="setZoom(false)">Zoom Out</button></center>
</nav>

<div class="navbar navbar-inverse navbar-fixed-top">

    <!--Include your brand here-->
    <a class="navbar-brand" href="#">Galway Bus Routes</a>

    <div class="navbar-header pull-right">
        <a id="nav-expander" class="nav-expander fixed">
            <b>&#9776;</b> &nbsp;<i class="fa fa-bars fa-lg white"></i>
        </a>
    </div>
</div>
<div class="loadingPanel">
    <div id="loader" class="hide"></div>
</div>
    <div id="map"></div>
    <div id="out"></div>

</body>
</html>
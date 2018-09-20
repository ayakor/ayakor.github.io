var district;

function highlightFeature(e){
    var layer = e.target;
    layer.setStyle(
    {
        weight:5,
        color:'black',
        fillColor:'white',
        fillopacity:0.2
    });
    if (!L.Browser.ie &&!L.Browser.opera){
        layer.bringToFront();
    }
}
function resetHighlight(e){
    district.resetStyle(e.target);
}
function zoomToFeature(e){
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer){
    layer.bindLabel(feature.properties.DISTRICT, {noHide : false});
    layer.on(
    {
        mouseover: highlightFeature,
        mouseout:resetHighlight,
        click : zoomToFeature
    }
    );
}



var mymap = L.map('map',{
		//fitBounds :([[80, 30.5],[88.2, 26.3]]),
        center:[28.28, 84.0],
        zoom:7,
        minZoom:4,
        maxZoom:18
        });

	var googlesatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']});

	var googlestreet = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']})

	var googleterrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']});

	var googlehybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']});

    var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});

   

/*Note the difference in the "lyrs" parameter in the URL:
Hybrid: s,h;
Satellite: s;
Streets: m;
Terrain: p;*/
	var base = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap); 

/*var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L'

    var mymap = L.map('map').setView([51.505, -0.09], 13)

    var bingLayer = L.tileLayer.Bing(BING_KEY).addTo(mymap);*/
function discharge_information (feature,
layer){
    layer.bindPopup("<h1 class ='infoHeader'> Spot Height :</h1<p class='infoHeader'>" + feature.properties.SPOTHT_DD1 + "<p class ='infoHeader'> Coordinates :</h1<p class='infoHeader'>" + feature.geometry.coordinates +"</p>");
    }
function polystyle_sunsari(feature) {
    return {
        fillColor: 'blue',
        weight: 2,
        opacity: 5,
        color: 'black',  
        fillOpacity: 0.8
    };
}

function poly_style_dis(Z_CODE){
    if (Z_CODE ==1) {
        return 'red';
    }
    else if (Z_CODE == 2){
        return 'blue'
    }
    else if (Z_CODE == 3){
        return 'green'
    }
    else if (Z_CODE == 4){
        return 'brown'
    }
    else if (Z_CODE == 5){
        return 'blue'
    }
    else if (Z_CODE == 6){
        return 'blue'
    }
    else if (Z_CODE == 7){
        return 'blue'
    }
   
   
    
}
function poly_style_type(TYPES2011){
    if (TYPES2011 == "PL" ) {
        return 'green'
    }
    else  {
        return 'brown'
    }
    
}
function polystyle_hims(feature) {
    return {
        weight: 3,
        opacity: 5,
        color: poly_style_type(feature.properties.TYPES2011),  
        fillOpacity: 0.8,
        dashArray : 0
    };
}
     
function polystyle(feature) {
    return {
        fillColor:poly_style_dis(feature.properties.Z_CODE),
        weight: 1,
        opacity: 0.5,
        color: 'black',  
        fillOpacity:0.05,
        dashArray : 4
    };
}

function data_information (feature,
layer){
    var picURL2 = feature.properties.image ;
    layer.bindPopup("<h1 class ='infoHeader'> Location:</h1<p class='infoHeader'>" + feature.properties.Location + "<p class ='infoHeader'> Coordinates:</h1<p class='infoHeader'>" + feature.geometry.coordinates  + "<img  src= '"+ picURL2 + "' " + "class=popupImage" + " />" + "</p>");
    }

function hq_information (feature,
layer){
    var picURL2 = 'http://ies.com.np/wp-content/uploads/2018/06/28511734_287125171815127_1884552455_n.jpg';
    layer.bindPopup("<h1 class ='infoHeader'> District Headquater:</h1<p class='infoHeader'>" + feature.properties.HQ_NAME + "<h1 class ='infoHeader'> District Id:</h1<p class='infoHeader'>" + feature.properties.DISTHQ75_D  + "<img  src= '"+ picURL2 + "' " + "class=popupImage" + " />" +"<img  src= '"+ picURL2 + "' " + "class=popupImage" + " />" + "<h1>");
    }
             
function dis_information (feature,
layer){
    layer.bindPopup("<h1 class ='infoHeader'> District:        </h1<p class='infoHeader'>" + feature.properties.DISTRICT + "<p class ='infoHeader'> Development Region:</h1<p class='infoHeader'>" + feature.properties.DIVISION +"</p>" );
    //layer.bindLabel(feature.properties.DIVISION.toString, {noHide : true});
    layer.on(
    {
        mouseover: highlightFeature,
        mouseout:resetHighlight,
        click : zoomToFeature
    }
    );
    


	
}
function sunsari_information (feature,
layer){
    layer.bindPopup("<h1 class ='infoHeader'> Type of Survey:        </h1<p class='infoHeader'>" + feature.properties.Name + "<p class ='infoHeader'> Development Region:</h1<p class='infoHeader'>" + feature.properties.FolderPath +"</p>" );
	
}
function hims_information (feature,
layer){
    layer.bindPopup("<h1 class ='infoHeader'>Road Name:        </h1<p class='infoHeader'>" + feature.properties.ROADNAME + "<p class ='infoHeader'> Road Reference No:</h1<p class='infoHeader'>" + feature.properties.ROADREFNO +"</p>" );
	
}


var district = L.geoJson(dis, {
	
    onEachFeature:dis_information,
    //onEachFeature:onEachFeature,
    style:polystyle
   
}).addTo(mymap);

//map.fitBounds(district.getBounds());

var hims = L.geoJson(hims, {
	
    onEachFeature:hims_information,
    style:polystyle_hims
    
    
}).addTo(mymap);

var sunsari = L.geoJson(sunsari, {
	
    onEachFeature:sunsari_information,
    style:polystyle_sunsari
    
}).addTo(mymap);

var headqarter= L.geoJson(hq, {
    onEachFeature: hq_information,
    pointToLayer: function(feature, latlng) {
                var smallIcon = new L.Icon({
                    iconSize: [20, 20],
                    iconAnchor: [13, 27],
                    popupAnchor:  [1, -24],
                    iconUrl: 'leaflet/images/hydroelectric.png'
                });
                return L.marker(latlng, {icon: smallIcon});
            },
}).addTo(mymap);

var discharge = L.geoJson(discharge, {
    onEachFeature: discharge_information,
    pointToLayer: function(feature, latlng) {
                var smallIcon = new L.Icon({
                    iconSize: [20, 20],
                    iconAnchor: [13, 27],
                    popupAnchor:  [1, -24],
                    iconUrl: 'leaflet/images/redhydroelectric.png'
                });
                return L.marker(latlng, {icon: smallIcon});
            },
}).addTo(mymap);

var data = L.geoJson(datta, {
    onEachFeature: data_information,
    pointToLayer: function(feature, latlng) {
                var smallIcon = new L.Icon({
                    iconSize: [20, 20],
                    iconAnchor: [13, 27],
                    popupAnchor:  [1, -24],
                    iconUrl: 'leaflet/images/yhydroelectric.png'
                });
                return L.marker(latlng, {icon: smallIcon});
            },
}).addTo(mymap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Running Projects", "Completed Projects","Upcoming Projects"],
        labels = ["leaflet/images/hydroelectric.png","leaflet/images/redhydroelectric.png","leaflet/images/yhydroelectric.png"];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML = '<div><b>Legend<b></div>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
             (" <img src="+ labels[i] + " height='20' width='20'>") + grades[i]  ;
    }

    return div;
};

legend.addTo(mymap);

    
	var baseLayers = {
        "Main Base Layer" : base,
        "Google Satellite": googlesatellite,
        "Google Street" : googlestreet,
        "Google Hybrid" : googlehybrid,
        "Google Terrian": googleterrain,
        "Open Street Map" : openstreetmap
        
		
	};

	var overlays = {
    "District" : district,
    "Running Projects" : headqarter,
    "Completed Projects" : discharge,
    "Upcoming Projects" : data,
    "Sunsari Project" : sunsari,
    "Road Inventory" : hims
	};

	L.control.layers(baseLayers, overlays).addTo(mymap);
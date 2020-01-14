// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  Personal_Crime: new L.LayerGroup(),
  Property_Crime: new L.LayerGroup(),
  Police_Precinct: new L.LayerGroup(),
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [33.75, -84.39],
  zoom: 12,
  layers: [
    layers.Personal_Crime,
    layers.Property_Crime,
    layers.Police_Precinct,
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Personal Crime": layers.Personal_Crime,
  "Property Crime": layers.Property_Crime,
  "Police Precinct": layers.Police_Precinct,
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

//-------------------------------- Add Legend ----------------------------
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML +=  '<img src="red-pin.png">' + '     Personal Crime' + '<br>'
    div.innerHTML +=  '<img src="orange-pin.png">' + '     Property Crime' + '<br>'
    div.innerHTML +=  '<img src="police.png">' + '     Police Precinct' + '<br>'
    

    return div;
};

legend.addTo(map);

//--------------------------------------------------------------------------


//---------------------------------- Setup Variables ------------------------------------

var red_pin = L.icon({
  iconUrl: 'red-pin.png',
  //shadowUrl: 'leaf-shadow.png',
  iconSize:     [38, 95], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var orange_pin = L.icon({
  iconUrl: 'orange-pin.png',
  //shadowUrl: 'leaf-shadow.png',
  iconSize:     [38, 95], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var police = L.icon({
  iconUrl: 'police.png',
  //shadowUrl: 'leaf-shadow.png',
  iconSize:     [38, 95], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// //------------------------------ Loop Through Data and Generate Markers for Crime------------------------------

d3.csv("COBRA-2019-Dec.csv").then(function(crimeData) {
  for (i=0; i < (crimeData.length); i++) {

        //Place crime type for pop-up information
        var location = [];
        var crime_type = (crimeData[i]['UCR Literal']);
        var street_address = (crimeData[i]['Location']);
        var date = (crimeData[i]['Possible Date']);
        var time = (crimeData[i]['Possible Time']);
    
    
        //Place lat long data into location variable
        location.push(crimeData[i]['Latitude']);
        location.push(crimeData[i]['Longitude']);
    
        //Determine color of pin based on personal or property crime
        //Personal crime will be red and property crime will be green
        
        var pin = '';
        var crime_layer = "";
    
        if ((crimeData[i]['UCR Literal']) == 'AGG ASSAULT') {
          pin = red_pin;
          crime_layer = "Personal_Crime";
        }
        else if ((crimeData[i]['UCR Literal']) == 'ROBBERY-PEDESTRIAN') {
          pin = red_pin;
          crime_layer = "Personal_Crime";
        }
        else if ((crimeData[i]['UCR Literal']) == 'HOMICIDE') {
          pin = red_pin;
          crime_layer = "Personal_Crime";
        }
        else if ((crimeData[i]['UCR Literal']) == 'MANSLAUGHTER') {
          pin = red_pin;
          crime_layer = "Personal_Crime";
        }
        else {
          pin = orange_pin;
          crime_layer = "Property_Crime";
        }
    
    
    
        //L.marker(location, {icon: red_pin}).addTo(myMap);
        L.marker(location, {icon: pin})
        .bindPopup("<h3> <b>" + crime_type + "</b></h3>" + "<h4>" + street_address + "</h4>" + "<h4> Possible Date: " + date + "</h4>" + "<h4> Possible Time: " + time + "</h4>")
        .addTo(layers[crime_layer]);
    
        
    }
        
});
//--------------------------------------------------------------------------------


//-----------------------------Atlanta Precinct Offices --------------------------

// var police = [
//   {
//     location: [33.75, -84.39],
//     Zone: 1,
//     Zone_Commander: "Major Kelley Collier",
//     Precinct_Address: "2315 Donald Lee Hollowell Pkwy N.W"
//   },
//   {
//     location: [33.84, -84.37],
//     Zone: 2,
//     Zone_Commander: "Major Andrew Senzer",
//     Precinct_Address: "3120 Maple Dr N.E."
//   },
  
// ];

// console.log("PLease work");
// console.log(police[0]);
// console.log(police[0]['Zone']);
// console.log(police[0]['Zone_Commander']);
// console.log(police[0]['Precinct_Address']);
// console.log(police[0]['location']);

// for (i=0; i < (police.length); i++) {
//   var zone_commander = (police[i]['Zone_Commander']);
//   console.log(zone_commander);
//   var precinct_location = (police[0]['location']);
//   console.log(precinct_location);

//   L.marker(precinct_location, {icon: police})
//   //.addTo(layers["Police_Precinct"]);
//   .addTo(map);

// }
  
//------------------------------Just Damn! Add the precincts by single line of code ------------------------------
        
L.marker([33.777328, -84.460678], {icon: police})
.bindPopup("<h3> <b> Zone 1 </b></h3>" + "<h4> Major Kelley Collier </h4>" )
.addTo(layers["Police_Precinct"]);

L.marker([33.840462, -84.372223], {icon: police})
.bindPopup("<h3> <b> Zone 2 </b></h3>" + "<h4> Major Andrew Senzer </h4>" )
.addTo(layers["Police_Precinct"]);

L.marker([33.73077, -84.373573], {icon: police})
.bindPopup("<h3> <b> Zone 3 </b></h3>" + "<h4> Major Carlo Peek </h4>" )
.addTo(layers["Police_Precinct"]);

L.marker([33.78513, -84.48057], {icon: police})
.bindPopup("<h3> <b> Zone 4 </b></h3>" + "<h4> Major Carven Tyus </h4>" )
.addTo(layers["Police_Precinct"]);

L.marker([33.75991, -84.38921], {icon: police})
.bindPopup("<h3> <b> Zone 5 </b></h3>" + "<h4> Major Darin Schierbaum </h4>" )
.addTo(layers["Police_Precinct"]);

L.marker([33.75066, -84.32122], {icon: police})
.bindPopup("<h3> <b> Zone 6 </b></h3>" + "<h4> Major David Vilaroel </h4>" )
.addTo(layers["Police_Precinct"]);

L.marker([33.64032, -84.4397], {icon: police})
.bindPopup("<h3> <b> Zone Airport</b></h3>" + "<h4> Major Maurice Bates </h4>" )
.addTo(layers["Police_Precinct"]);

//.addTo(map);

 //d3.csv("Test.csv").then(function(police) {
  // for (i=0; i < (police.length); i++) {

  //       var precinct_location = [];
  //       var zone = (police[i]['Zone']);
  //       var zone_commander = (police[i]['Zone_Commander']);
  //       var precinct_address = (police[i]['Precinct_Address']);
  //       var precinct_address = (police[i]['location']);
            
    
  //       // //Place lat long data into location variable
  //       // precinct_location.push(police[i]['Lat']);
  //       // precinct_location.push(police[i]['Long']);

  //       L.marker(precinct_location, {icon: police})
  //       //.bindPopup("<h3> <b> Zone" + zone + "</b></h3>" + "<h4>" + zone_commander + "</h4>" + "<h4> Precinct Address: " + precinct_address + "</h4>")
  //       .addTo(layers["Police_Precinct"]);
        

  //}

 //});


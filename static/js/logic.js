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
  Police_Precient: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [33.75, -84.39],
  zoom: 12,
  layers: [
    layers.Personal_Crime,
    layers.Property_Crime,
    layers.Police_Precient
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Personal Crime": layers.Personal_Crime,
  "Property Crime": layers.Property_Crime,
  "Police_Precient": layers.Police_Precient
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

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



// //------------------------------ Loop Through Dat and Generate Markers ------------------------------

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


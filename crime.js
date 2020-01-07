// Create a map object
var myMap = L.map("map", {
    center: [33.75, -84.39],
    zoom: 14
  });
  
  // Add a tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  var red_pin = L.icon({
    iconUrl: 'red-pin.png',
    //shadowUrl: 'leaf-shadow.png',
    //iconSize:     [38, 95], // size of the icon
    iconSize:     [30, 45], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
}); 

d3.csv("COBRA-2009-2018.csv").then(function(crimeData) {
    //Print crime data
    console.log(crimeData[0]['UCR Literal']);
    console.log(crimeData[1]['UCR Literal']);
    console.log(crimeData[2]['UCR Literal']);

    
    for (i=0; i < (crimeData.length); i++) {

        //initialize location information
        var location = [];
        var crime_type = (crimeData[i]['UCR Literal']);

    
        location.push(crimeData[i]['Latitude']);
        location.push(crimeData[i]['Longitude']);

    

        //L.marker(location, {icon: red_pin}).addTo(myMap);
        L.marker(location, {icon: red_pin}).bindPopup("<h1>" + crime_type + "</h1>").addTo(myMap);

    }

})


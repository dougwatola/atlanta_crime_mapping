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
  
  

d3.csv("COBRA-2009-2018.csv").then(function(crimeData) {
    //Print crime data
    console.log(crimeData[0]['UCR Literal']);
    console.log(crimeData[1]['UCR Literal']);
    console.log(crimeData[2]['UCR Literal']);

    
    for (i=0; i < (crimeData.length); i++) {

        //initialize location information
        var location = [];

    
        location.push(crimeData[i]['Latitude']);
        location.push(crimeData[i]['Longitude']);

    

        L.marker(location).addTo(myMap);

    }

})


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
  
  var green_pin = L.icon({
    iconUrl: 'green-pin.png',
    //shadowUrl: 'leaf-shadow.png',
    iconSize:     [38, 95], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

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

d3.csv("COBRA-2009-2018.csv").then(function(crimeData) {
    
    
    for (i=0; i < (crimeData.length); i++) {

        //Place crime type for pop-up information
        var location = [];
        var crime_type = (crimeData[i]['UCR Literal']);

        //Place lat long data into location variable
        location.push(crimeData[i]['Latitude']);
        location.push(crimeData[i]['Longitude']);

        //Determine color of pin based on personal or property crime
        //Personal crime will be red and property crime will be green
        
        var pin = '';

        if ((crimeData[i]['UCR Literal']) == 'AGG ASSAULT') {
          pin = red_pin;
        }
        else if ((crimeData[i]['UCR Literal']) == 'ROBBERY-PEDESTRIAN') {
          pin = red_pin;
        }
        else if ((crimeData[i]['UCR Literal']) == 'HOMICIDE') {
          pin = red_pin;
        }
        else if ((crimeData[i]['UCR Literal']) == 'MANSLAUGHTER') {
          pin = red_pin;
        }
        else {
          pin = green_pin;
        }

    

        //L.marker(location, {icon: red_pin}).addTo(myMap);
        L.marker(location, {icon: pin}).bindPopup("<h1>" + crime_type + "</h1>").addTo(myMap);

    }

})


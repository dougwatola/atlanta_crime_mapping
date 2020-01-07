

d3.csv("COBRA-2009-2018.csv").then(function(crimeData) {
    //Print crime data
    console.log(crimeData[0]['UCR Literal']);
    console.log(crimeData[1]['UCR Literal']);
    console.log(crimeData[2]['UCR Literal']);

    //declare crime_data list
    var location = [];

    //location.push("Test");

    // location.push(crimeData[0]['Latitude']);
    // location.push(crimeData[0]['Longitude']);

    location.push(crimeData[0]['Latitude']);
    location.push(crimeData[0]['Longitude']);

    console.log(location);

})


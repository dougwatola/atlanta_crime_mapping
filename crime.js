//declare crime_data list
var crime_city = []

d3.csv("cities.csv").then(function(crimeData) {
    //Print crime data
    console.log(crimeData[0].city);
    console.log(crimeData[1].city);
    console.log(crimeData[2].city);

    // crime_city.push(crimeData[0].city);
    // crime_city.push(crimeData[1].city);
    // crime_city.push(crimeData[2].city);

     for (i=0; i < (crimeData.length); i++) {
          crime_city.push(crimeData[i].city);
     }
})

console.log(crime_city[0]);
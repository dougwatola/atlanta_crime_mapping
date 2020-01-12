d3.csv("COBRA-2019-Dec.csv").then(function(crimeData) {
  //Place crime type for pop-up information
  var location = [];
    var crime_type = (crimeData[1]['UCR Literal']);
    var street_address = (crimeData[1]['Location']);
    var date = (crimeData[1]['Possible Date']);
    var time = (crimeData[1]['Possible Time']);


    //Place lat long data into location variable
    location.push(crimeData[1]['Latitude']);
    location.push(crimeData[1]['Longitude']);

    //Determine color of pin based on personal or property crime
    //Personal crime will be red and property crime will be green
    
    var pin = red_pin;

    

}
let myMap = L.map("map", {
    center: [1, 1],
    zoom: 1
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
  
  d3.json(url).then(function(response) {
  
    console.log(response);
    features = response.features;
  
    for (let i = 0; i < features.length; i++) {
  
      let location = features[i].geometry;
      if(location){
        console.log(features[i].properties)
        /*var newMarker = L.marker([location.coordinates[1], location.coordinates[0]],
            color =location.coordinates[2],
            size = features[i].properties.mag);
        newMarker = newMarker.bindPopup("<h3>" +"ALERT: "+ features[i].properties.alert);
        newMarker.addTo(myMap);*/
        let alert = features[i].properties.alert;
        if(alert == null) {
            alert = "None";
        }
        let thisDepth = location.coordinates[2];
        console.log(thisDepth);
        if(thisDepth < 20) {
            color = "black"
        }
        else if(thisDepth < 50) {
            color = "red"
        } else if(thisDepth < 500){
            color = "orange"
        } else if(thisDepth < 1000) {
            color = "yellow"
        } else {
            color = "green"
        }

        L.circle([location.coordinates[1],location.coordinates[0],], {
            color: color,
            fillcolor: color,
            radius: Math.sqrt(features[i].properties.mag)*200000
          }).bindPopup("ALERT: " + alert).addTo(myMap);
          
      }
    
    }
  
  });
  
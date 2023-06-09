
 // Create the base layers
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create the baseMaps object
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
  };


// Store the Earthquake data API
  let quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
 
  // Perform a GET request to the query URL
  d3.json(quakeData).then(function(data) {
  
    let features = data.features;
   
    console.log(features);

// The function that will determine the colour of the circle based on the earthquake depth
function chooseColor(depth) {
    if (depth > 90) return "#191970";
    else if (depth > 70) return "#000080";
    else if (depth > 50) return "#4169E1";
    else if (depth > 30) return "#6495ED";
    else if (depth > 10) return "#4682B4";
    else return "#FFD700";
  }

// Define a function that will give each earthquake a different radius based on its magnatude.
function radiusCalc(magnatude) {
   return (magnatude) * 45000;
}

let earthQuakesMarkers = []

// Loop through the features array, and create one marker for each earthquake
for (let i = 0; i < features.length; i++) {
       
    let location = features[i].geometry;
    
    if(location){
        earthQuakesMarkers.push(
            L.circle([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.9,
            color: "black",
            weight: 0.5,
            fillColor: chooseColor(location.coordinates[2]),
            radius: radiusCalc(features[i].properties.mag),
        }).bindPopup(`<h3>${features[i].properties.place}</h3><hr><h4>Magnatude: ${features[i].properties.mag}</h4>
        <h4>Depth: ${location.coordinates[2]} km</h4>
        <p>Time: ${new Date(features[i].properties.time)}</p>`));
    } 
    
}

// Add all the Earthquake Markers to a new layer group.
let earthquakeLayer = L.layerGroup(earthQuakesMarkers);

// Store the Tectonic plates data API
let platesData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

 // Perform a GET request to the query URL and add it to the map.
let plateLines = d3.json(platesData).then(function(plates) {
  L.geoJSON(plates, {
    color: "yellow",
    weight: 2
    }).addTo(myMap);
  });

  // Add plate lines to a new layer group.
let platesLayer = L.layerGroup(plateLines)


// Overlays that can be toggled on or off
let overlayMaps = {
    "Earthquakes" : earthquakeLayer,
    "Techtonic Plates" : platesLayer, 
};

// Creating the map object
let myMap = L.map("map", {
    center: [
        0,0
    ],
    minZoom: 2,
    zoom: 2.5,
    layers: [street, earthquakeLayer, platesLayer]
  });


  // Set up the legend
  let legend = L.control({ position: "bottomright" });


  // Desiging the legend
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h5>Earthquake Depth</h5>";
    div.innerHTML += '<i style="background: #FFD700"></i><span>: -10 - 10</span><br>';
    div.innerHTML += '<i style="background: #4682B4"></i><span>: 10 - 30</span><br>';
    div.innerHTML += '<i style="background: #6495ED"></i><span>: 30 - 50</span><br>';
    div.innerHTML += '<i style="background: #4169E1"></i><span>: 50 - 70</span><br>';
    div.innerHTML += '<i style="background: #000080"></i><span>: 70 - 90</span><br>';
    div.innerHTML += '<i style="background: #191970"></i><span>: 90+ </span><br>';
   
    return div;
  }
  // Adding the legend to the map
  legend.addTo(myMap);

  // Set up the title
  let title = L.control({ position: "bottomleft" });

  // Desiging the title
  title.onAdd = function() {
    let div = L.DomUtil.create("div", "title");
    div.innerHTML += "<h1>USGS 'All' Earthquake data for last week</h1>";
  
   return div;
  }
  // Adding the title to the map
  title.addTo(myMap);

// Create our map, giving it the streetmap and earthquakes layers to display on load.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


});
  

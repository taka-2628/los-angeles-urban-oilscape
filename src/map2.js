mapboxgl.accessToken = 'pk.eyJ1IjoidGgtdGgiLCJhIjoiY2t3N2Q1YmNxOW8wajMxczE4ZndqaDRuNCJ9.UWfb1rN9Hl6lBXJGLC6Vrw';

/* Variables for flyto (zoom) */
const start = {
  center: [-118.3, 34.3],
  zoom: 8.7,
  pitch: 0,
  bearing: 0
};
const end = {
  center: [-118.2, 33.9],
  zoom: 10.3,
  bearing: 0,
  pitch: 0
};

const map = new mapboxgl.Map({
  container: 'map', /* id of div */
  style: 'mapbox://styles/th-th/cl5hk0ci5000314p6hypm3iaq', /* mapbox://styles/th-th/cl30bmhvy004815ns0s6crrhg*/
  ...start
});

/* Mapbox Layer Visibility Toggle */
map.on('idle', () => {  
  // Set up the corresponding toggle button for each layer.
  const oneMileCircle = document.getElementById("oil-wells-1-mile-radius-circle");
  const cdi = document.getElementById("concentrated-disadvantage-index");
  const ipi =  document.getElementById("income-per-capita");

  // Show or hide layer when the toggle is clicked.
  oneMileCircle.onclick = function(e){
    const clickedLayer = this.id
    e.preventDefault();
    e.stopPropagation();

    const visibility = map.getLayoutProperty(clickedLayer, 'visibility');
    if (visibility === 'none') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      this.className = 'active';
    } else {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.classList.remove('active');  
    }
  }
  cdi.onclick = function(e){
    const clickedLayer = this.id
    e.preventDefault();
    e.stopPropagation();

    const visibility = map.getLayoutProperty(clickedLayer, 'visibility');
    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.classList.remove('active');  
    } else {
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      this.className = 'active';
    }
  }
  ipi.onclick = function(e){
    const clickedLayer = this.id
    e.preventDefault();
    e.stopPropagation();

    const visibility = map.getLayoutProperty(clickedLayer, 'visibility');
    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.classList.remove('active');  
    } else {
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      this.className = 'active';
    }
  }
});

/* 1 mile radius circles */
/*
map.on('load', () => {
  map.addSource('oil-wells', {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: 'https://taka-2628.github.io/los-angeles-oil-wells-geojson/data/la-oil-wells-turf-geometry.geojson'
  });

  map.addLayer({
    'id': 'oil-wells-fill',
    'type': 'fill',
    'source': 'oil-wells',
    'layout': {},
    'paint': {
      'fill-color': '#ffffff',
      'fill-opacity': 0.1
    }
  });
  map.addLayer({
    'id': 'oil-wells-line',
    'type': 'line',
    'source': 'oil-wells',
    'layout': {},
    'paint': {
      'line-color': '#ffffff',
      'line-width': 0.25
    }
  });
});
*/

/* center points */
map.on('load', () => {
  map.addSource('oil-wells-points', {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: 'https://taka-2628.github.io/los-angeles-oil-wells-geojson/data/la-oil-wells-cleaned.json'
  });

  map.addLayer({
    'id': 'oil-wells-points',
    'type': 'circle',
    'source': 'oil-wells-points',
    'paint': {
      'circle-radius': 2,
      'circle-stroke-width': 1,
      'circle-color': 'white',
      'circle-stroke-color': 'white'
    }
  });
});

/* Change Zoom Level */
let isAtStart = true;

const zoomButton = document.getElementById('zoom');
zoomButton.addEventListener('click', () => {
    // depending on whether we're currently at point a or b,
    // aim for point a or b
    const target = isAtStart ? end : start;
    isAtStart = !isAtStart;

    if ( !isAtStart ){
      zoomButton.className = 'active'
    } else {
      zoomButton.classList.remove('active');
    }

    map.flyTo({
        ...target, // Fly to the selected target
        duration: 4000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
    });
});

/*
Promise.all([ 
  d3.json("https://taka-2628.github.io/los-angeles-oil-wells-geojson/data/la-oil-wells-cleaned.json"),
  d3.json("https://taka-2628.github.io/los-angeles-oil-wells-geojson/data/la-oil-wells-turf-geometry.geojson"),
  d3.json("https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson"),
  d3.json("https://taka-2628.github.io/los-angeles-oil-wells-geojson/data/Income_per_Capita_(census_tract).geojson"),
  d3.json("https://docs.mapbox.com/mapbox-gl-js/assets/rwanda-provinces.geojson")
])
.then(function(files) {
  const oilWells = files[0];
  const oilWellsTurf = files[1];
  const usStates = files[2];
  const incomePerCaita = files[3];
  const d = files[4];
  // add markers to map
  //console.log(oilWells)
  //console.log(oilWellsTurf)
  //console.log(usStates)
  console.log(incomePerCaita)
  console.log(d)
})
*/
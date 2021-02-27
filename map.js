//Create Leaflet Map centered on Calgary
var map = L.map('leafletMap').setView([51.0447, -114.0719], 10.5);

//Add OSM Basemap
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieTluaW5nIiwiYSI6ImNrbGxxdXpxMzAxd3kyd21mM2JqZ3dyZGEifQ.qDVDxbn2LsePNPHw97LSTg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieTluaW5nIiwiYSI6ImNrbGxxdXpxMzAxd3kyd21mM2JqZ3dyZGEifQ.qDVDxbn2LsePNPHw97LSTg'
}).addTo(map);

//////Create a map and the map tile//////////////
var mymap = L.map('mapid').setView([51.0447, -114.0719], 10.5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieTluaW5nIiwiYSI6ImNrbGxxdXpxMzAxd3kyd21mM2JqZ3dyZGEifQ.qDVDxbn2LsePNPHw97LSTg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieTluaW5nIiwiYSI6ImNrbGxxdXpxMzAxd3kyd21mM2JqZ3dyZGEifQ.qDVDxbn2LsePNPHw97LSTg'
}).addTo(mymap);


//////////////////// markercluster and sipderfier added /////////////////////
var markers = L.markerClusterGroup();
var oms = new OverlappingMarkerSpiderfier(mymap);
var popup = new L.Popup();
oms.addListener('click', function(marker) {
  popup.setContent(marker.desc);
  popup.setLatLng(marker.getLatLng());
  mymap.openPopup(popup);
});
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
mymap.on('click', onMapClick);

document.querySelector("form").addEventListener('submit', (event) => {
  var tuples = new FormData(event.target);
  var info = tuples.get('begin');
  var rangeenda = info.substring(0,10);
  var rangeendb = info.substring(13);

  var api = new HttpClient();
  api.get("https://data.calgary.ca/resource/c2es-76ed.geojson?" + "$where=issueddate > " +
  "\'" + rangeenda + "\'" + " and issueddate < " + "\'" + rangeendb + "\'",
  function(get_request) {
    createMarkers(get_request);
  });
  event.preventDefault();
});

var HttpClient = function() {
    this.get = function(link, answer) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200)
            // Typical action to be performed when the document is ready:
                answer(xhttp.responseText);
              }
              xhttp.open( "GET", link, true );
              xhttp.send();
    }
}

function createMarkers(clusters) {
  var data = JSON.parse(clusters);
  markers.clearLayers();
  oms.clearMarkers();

  if (data.features.length == 0) {
  } else {
    for (permit in data.features) {
      if (data.features[permit].geometry != null) {
        var latlng = data.features[permit].geometry.coordinates;
        var issueddate = data.features[permit].properties.issueddate;
        var workclassgroup = data.features[permit].properties.workclassgroup;
        var contractorname = data.features[permit].properties.contractorname;
        var communityname = data.features[permit].properties.communityname;
        var originaladdress = data.features[permit].properties.originaladdress;
        var setcontent = "Issued Date:" + issueddate + "<br>Community Name: "
        + communityname + "<br>Work Class Group: " + workclassgroup + "<br>Contractor: "
        + contractorname + "<br>Original Address: " + originaladdress + "</td></tr></table>";

        var marker = new L.marker([latlng[1], latlng[0]]);
        marker.desc = setcontent;
        oms.addMarker(marker);
        markers.addLayer(marker);
      }
    }
    mymap.addLayer(markers);
  }
}

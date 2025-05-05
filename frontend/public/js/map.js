let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -7.250445, lng: 112.768845 }, // Koordinat Surabaya
    zoom: 12,
  });
}

function showMap(location) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: location }, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode gagal karena: ' + status);
    }
  });
}

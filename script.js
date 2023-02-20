const mymap = L.map('sample_map').setView([40.741, -3.884], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
  maxZoom: 18
}).addTo(mymap);


function InitialPosition(){
  mark = navigator.geolocation.getCurrentPosition((position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      };
    
    user_pos = L.marker([pos.lat, pos.lng]);
    user_pos.addTo(mymap);


  },(err) => {
    const errorMessage = document.createElement("p");
    errorMessage.innerText = `Error: ${err.message}`;
    document.body.appendChild(errorMessage);
  });
}

function getCurrentLocation(){
  navigator.geolocation.getCurrentPosition((position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      };

      user_pos.setLatLng([pos.lat, pos.lng]);

  },(err) => {
    const errorMessage = document.createElement("p");
    errorMessage.innerText = `Error: ${err.message}`;
    document.body.appendChild(errorMessage);
  });
}  

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function vibrarlejos(){
  window.navigator.vibrate([1000, 4000])
}

function vibrarcerca(){
  window.navigator.vibrate([2000, 500])
}

function track() {
  let dist = getDistanceFromLatLonInKm(user_pos.getLatLng().lat,user_pos.getLatLng().lng,destino.getLatLng().lat,destino.getLatLng().lng);
  //console.log(dist);
  
  if (dist > 0.4 && dist < 1)
  {
    console.log("tramo 1",dist)
    vibrarlejos();
  }
  
  if (dist < 0.4 )
  {
    console.log("tramo 2",dist)
    vibrarcerca();
  }
  
}


var user_pos;
var destino = new L.marker();
var dist1 = new L.circle();
var dist2 = new L.circle();
console.log(destino);
InitialPosition();
let timer2 = setTimeout(function tick() { 
  getCurrentLocation()
  timer2 = setTimeout(tick, 5000); 
}, 5000);





mymap.on('click', function(e) {
  destino.setLatLng(e.latlng);
  dist1.setLatLng(destino.getLatLng());
  dist1.setRadius(400);
  dist2.setLatLng(destino.getLatLng());
  dist2.setRadius(1000);
  destino.addTo(mymap);
  dist1.addTo(mymap);
  dist2.addTo(mymap);

  let timerId = setTimeout(function tick2() { 
    track()
    timerId = setTimeout(tick2, 5000); 
  }, 5000);
  
  



})



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
    
    var marker = L.marker([pos.lat, pos.lng]);
    marker.addTo(mymap);
    return marker

  },(err) => {
    const errorMessage = document.createElement("p");
    errorMessage.innerText = `Error: ${err.message}`;
    document.body.appendChild(errorMessage);
  });
  console.log(mark)
  return (mark)
}

function getCurrentLocation(marker){
  navigator.geolocation.getCurrentPosition((position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      };

    marker.setLatLng([pos.lat, pos.lng]);

  },(err) => {
    const errorMessage = document.createElement("p");
    errorMessage.innerText = `Error: ${err.message}`;
    document.body.appendChild(errorMessage);
  });
}  

let user_pos = InitialPosition()


let timerId = setTimeout(function tick() {  
  console.log('tick'); 
  getCurrentLocation(user_pos);
  timerId = setTimeout(tick, 2000); 
}, 2000);






mymap.on('click', function(e) {
  console.log(e);

})

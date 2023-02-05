var stovemap = L.map("StoveMap").setView([20.5937, 78.9629], 5);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//tiles used to create map
const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(stovemap);

//icons of stove
var StoveIconOn = L.icon({
  iconUrl: "StoveIconOn.png",
  iconSize: [20, 40],
  iconAnchor: [10, 40],
  popupAnchor: [0, -40],
});
var StoveIconOff = L.icon({
  iconUrl: "StoveIconOff.png",
  iconSize: [20, 40],
  iconAnchor: [10, 40],
  popupAnchor: [0, -40],
});

//API Information to pull stove data from
//const API = ''

//stove data

var recivedData;
var totalStoves;
var result = [];

//Function to pull and map stove data using mqtt

//function creatReq() {}

function PullData() {
  let key = sessionStorage.getItem("key");
  console.log("KEY =" + key);
  let xhr = new XMLHttpRequest();
  let url = "http://localhost:4000/api/posts/getStoves";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("auth-token", key);

  // Create a state change callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);

      var data = JSON.parse(xhr.responseText);
      totalStoves = Object.keys(data).length;
      console.log(totalStoves);

      var keys = Object.keys(data);
      keys.forEach(function (key) {
        result.push(data[key]);
      });

      console.log("In Status => " + result[0].longitude);

      for (var i = 0; i < totalStoves; i++) {
        console.log(result[i].latitude);

        if (result[i].status == "On") {
          marker = new L.marker([result[i].latitude, result[i].longitude], {
            icon: StoveIconOn,
            title: result[i].stoveNo,
          })
            .addTo(stovemap)
            .bindPopup("Serial Number: " + String(result[i].serialNo));
        }
        //Status Off
        else {
          marker = new L.marker([result[i].latitude, result[i].longitude], {
            icon: StoveIconOff,
            title: result[i].stoveNo,
          })
            .addTo(stovemap)
            .bindPopup("Serial Number: " + String(result[i].serialNo));
        }
      }
    }

    //console.log(stovepoint[0]);
  };
  xhr.send();
}

// Converting JSON data to string
//var data = JSON.stringify({ "email": email.value, "password": pass.value });

// Sending data with the request

//console.log("iusdbkjsbv");
//iterations of mapping each stove location and data

//function to search stoves

function logOut() {
  sessionStorage.clear();
  window.location.href = "/frontend/login.html";
}
function SearchSerial() {
  var SN = document.getElementById("SerialNumber").value;
  for (var j = 0; j < totalStoves; j++) {
    if (result[j].serialNo == SN) {
      stovemap.flyTo([result[j].latitude, result[j].longitude], 16, {
        animate: true,
        duration: 2,
      });
      document.getElementById("SN").innerHTML =
        "Serial Number: " + String(result[j].serialNo);
      document.getElementById("STN").innerHTML =
        "Stove Number:  " + String(result[j].stoveNo);
      document.getElementById("LA").innerHTML =
        "Latitude:  " + String(result[j].latitude);
      document.getElementById("LO").innerHTML =
        "Longitude:  " + String(result[j].longitude);
      document.getElementById("D").innerHTML =
        "Date:  " + String(result[j].date);
      document.getElementById("T").innerHTML =
        "Time:  " + String(result[j].time);
      document.getElementById("BT").innerHTML =
        "Start Temperature(°C):  " + String(result[j].startTemp);
      document.getElementById("ET").innerHTML =
        "Stop Temperature(°C):  " + String(result[j].stopTemp);
      document.getElementById("TWH").innerHTML =
        "Total Working Hours:  " + String(result[j].workingHour);
      document.getElementById("ECE").innerHTML =
        "Estimated Carbon Emissions(%):  " + String(result[j].emission);
      document.getElementById("S").innerHTML =
        "Status:  " + String(result[j].status);
      break;
    }
  }
}

//scale
L.control
  .scale({ maxWidth: 240, metric: true, position: "bottomleft" })
  .addTo(stovemap);

//Actication of necessary functions(Pulling and Refreshing Data)
PullData();
setInterval(PullData, 600);

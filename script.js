const countries = {

india: {
name: "India 🇮🇳",
lat: 20.5937,
lon: 78.9629
},

japan: {
name: "Japan 🇯🇵",
lat: 36.2048,
lon: 138.2529
},

usa: {
name: "United States 🇺🇸",
lat: 39.8283,
lon: -98.5795
},

germany: {
name: "Germany 🇩🇪",
lat:  51.1657,
lon: 10.4528
},

uk: {
name: "United Kingdom 🇬🇧",
lat: 55.3781,
lon: -3.4360
},

australia: {
name: "Australia 🇦🇺",
lat: -25.2744,
lon: 133.7751
}

};

let userLat = null;
let userLon = null;

function getLocation() {

if (!navigator.geolocation) {

alert("Geolocation not supported");

return;

}

navigator.geolocation.getCurrentPosition(

(position) => {

userLat = position.coords.latitude;
userLon = position.coords.longitude;

document.getElementById("lat").innerText =
userLat.toFixed(4);

document.getElementById("lon").innerText =
userLon.toFixed(4);

},

(error) => {

console.log(error);

}

);

}

getLocation();

function calculateBearing(
lat1,
lon1,
lat2,
lon2
) {

const toRad =
(deg) => deg * Math.PI / 180;

const toDeg =
(rad) => rad * 180 / Math.PI;

const dLon =
toRad(lon2 - lon1);

const y =
Math.sin(dLon) *
Math.cos(toRad(lat2));

const x =
Math.cos(toRad(lat1)) *
Math.sin(toRad(lat2))
-
Math.sin(toRad(lat1)) *
Math.cos(toRad(lat2)) *
Math.cos(dLon);

let bearing =
toDeg(
Math.atan2(y, x)
);

bearing =
(bearing + 360) % 360;

return bearing;

}

function calculateDistance(
lat1,
lon1,
lat2,
lon2
) {

const R = 6371;

const dLat =
(lat2 - lat1) *
Math.PI / 180;

const dLon =
(lon2 - lon1) *
Math.PI / 180;

const a =
Math.sin(dLat / 2) *
Math.sin(dLat / 2)
+
Math.cos(lat1 * Math.PI / 180)
*
Math.cos(lat2 * Math.PI / 180)
*
Math.sin(dLon / 2)
*
Math.sin(dLon / 2);

const c =
2 *
Math.atan2(
Math.sqrt(a),
Math.sqrt(1 - a)
);

return Math.round(
R * c
);

}

function directionName(angle) {

const dirs = [
"N",
"NE",
"E",
"SE",
"S",
"SW",
"W",
"NW"
];

return dirs[
Math.round(angle / 45) % 8
];

}

document
.getElementById("findCountry")
.addEventListener(
"click",
() => {

if (userLat === null) {

alert(
"Waiting for GPS..."
);

return;

}

const selected =
document
.getElementById(
"countrySelect"
)
.value;

const country =
countries[selected];

const bearing =
calculateBearing(
userLat,
userLon,
country.lat,
country.lon
);

const distance =
calculateDistance(
userLat,
userLon,
country.lat,
country.lon
);

document
.getElementById(
"countryName"
).innerText =
country.name;

document
.getElementById(
"bearing"
).innerText =
"Bearing: " +
bearing.toFixed(1)
+
"°";

document
.getElementById(
"distance"
).innerText =
"Distance: "
+
distance
+
" km";

document
.getElementById(
"needle"
)
.style.transform =
`translate(-50%,-100%) rotate(${bearing}deg)`;

document
.getElementById(
"heading"
)
.innerText =
bearing.toFixed(1)
+
"°";

document
.getElementById(
"direction"
)
.innerText =
directionName(
bearing
);

}
);

if (
window.DeviceOrientationEvent
) {

window.addEventListener(
"deviceorientation",
(event) => {

let heading =
event.alpha;

if (
heading !== null
) {

document
.getElementById(
"heading"
)
.innerText =
heading.toFixed(0)
+
"°";

document
.getElementById(
"direction"
)
.innerText =
directionName(
heading
);

}

}
);

}

// TOIMII!!!
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var APP_ID = "itku";

var nopeus = 20;

setInterval(function() {
   // random testausta varten
    var random = Math.floor((Math.random() * 2) + 1);
    if(random < 2) {
        if (nopeus === 0) {
            nopeus = nopeus + 1;
        } else {
            nopeus = nopeus - 1;
        }
    } else {
        nopeus = nopeus + 1;
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/bussidata', true);
    xhr.onload = function (){
        console.log('Sensoridataa lähetetty');
    }
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Syötetään sensoridata
    var sensoridata = {
        "app_id": "bussintarkkailu",
        "dev_id": 1,
        "timeStamp": "String",
        "location": {
            "coordinates": [60.1856871,24.682761],
            "speed": nopeus,
            "heading": "String",
            "altitude": 123
        },
        "audio": {
             "maxDecibel": 72
        },
        "motionsensor": {
            "stepCounter": 1234,
            "acceleration": [1,2,3]
        },
        "device": {
        "battery": 32,
        "msg": "Kaikki hyvin. Kyydissä 3 matkustajaa.",
        "storage": "5/32"
        }
    };
    console.log(JSON.stringify(sensoridata));

    // Lähetetään sensoridata
    xhr.send(JSON.stringify(sensoridata));
}, 1000);
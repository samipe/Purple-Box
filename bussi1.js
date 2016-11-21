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
    var sensoridata = {APP_ID:APP_ID, DEV_ID:'2', nopeus:nopeus, yhteys:'Leppävaara - Vanha maantie 6', TimeStamp:'16:30'};
    console.log(JSON.stringify(sensoridata));

    // Lähetetään sensoridata
    xhr.send(JSON.stringify(sensoridata));
}, 1000);
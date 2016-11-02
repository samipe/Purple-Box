// TOIMII!!!
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var bussiID = 2;

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
        console.log('Tallennettu');
    }
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Syötetään sensoridata
    var sensoridata = {ID:bussiID, nopeus:nopeus, yhteys:'Rautatientori - Kamppi'};
    console.log(sensoridata);

    // Lähetetään sensoridata
    xhr.send(JSON.stringify(sensoridata));
}, 1000);
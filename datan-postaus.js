// TOIMII!!!
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

setInterval(function() {
   // rando testausta varten
    var random = Math.floor((Math.random() * 10) + 1);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/bussidata', true);
    xhr.onload = function (){
            console.log('Piri');
    }
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Syötetään sensoridata
    var sensoridata = {ID:random, nopeus:random, yhteys:'lepuski-bule'};
    console.log(sensoridata);

    // Lähetetään sensoridata
    xhr.send(JSON.stringify(sensoridata));
}, 1000);
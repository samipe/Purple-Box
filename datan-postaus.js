// TOIMII!!!

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();
xhr.open("POST", 'http://localhost:3000/bussidata', true);
xhr.onload = function (){
    console.log('Piri');
}
xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

// Syötetään sensoridata
var sensoridata = {ID:1, nopeus:12, yhteys:'lepuski-bule'};
console.log(sensoridata);

// Lähetetään sensoridata
xhr.send(JSON.stringify(sensoridata));
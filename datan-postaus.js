var mypostrequest=new ajaxRequest()
mypostrequest.onreadystatechange=function(){
 if (mypostrequest.readyState==4){
  if (mypostrequest.status==200 || window.location.href.indexOf("http")==-1){
   document.getElementById("result").innerHTML=mypostrequest.responseText
  }
  else{
   alert("An error has occured making the request")
  }
 }
}
var namevalue=encodeURIComponent(document.getElementById("name").value)
var agevalue=encodeURIComponent(document.getElementById("age").value)
var parameters="name="+namevalue+"&age="+agevalue
mypostrequest.open("POST", "http://localhost:27017/bussidata", true)
mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
mypostrequest.send(parameters)


// Viritys 2
/*
var request = require('xhr-request')

request('http://localhost:27017/bussidata', {
    method: 'POST',
    json: true,
    body: { bussiID: 1 }
})
*/

// Viritys 1
/*
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open("POST", 'http://localhost:27017/bussidata', true);
xhr.onload = function (){
    console.log('Piri');
}
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
console.log({
    bussiID: 1
});
xhr.send(JSON.stringify({
    bussiID: 1
}));
console.log('Postaa');
*/
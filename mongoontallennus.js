var mongoose = require('mongoose');
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')
app.set('view engine', 'pug');

var bussiskannaus = function(){
    
app.use( bodyParser.json() );       // to support JSON-encoded bodies ty7vcytv
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
//app.use(express.json());
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost/bussidata');
// Create a schema
var bussiskeema = new mongoose.Schema({
  bussiID: Number,
  nopeus: Number,
  yhteys: String,
  viimeisin_tieto: { type: Date, default: Date.now },
});
// Create a model based on the schema
var Todo = mongoose.model('bussidataa', bussiskeema);

var tiedot = mongoose.model('tiedot', bussiskeema);  
    
var ti; //alustetaan muuttuja ti
    
app.post('/bussidata', function (req, res) {
//  var piri = "kovaa kamaa";
    ti = new tiedot({bussiID: req.body.ID, nopeus: req.body.nopeus, yhteys: req.body.yhteys});
    console.log(req.body)
    res.status(451).send("moi");
    
    // eritellään muuttuja B
    
    /*var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.send(JSON.stringify('nopeus=32'));*/
    
    /*var valvomoBussiID = obj.bussiID;
    var valvomoNopeus = obj.nopeus;
    var valvomoYhteys = obj.yhteys;*/
    
    ti.save(function(err){
  if(err)
    console.log(err);
  else
      
    // eritellään muuttujat A 
    /*
    var jsonData = JSON.parse(ti);
    for (var i = 0; i < jsonData.tiedot.length; i++) {
        var tiedot = jsonData.tiedot[i];
        console.log(tiedot.bussiID);
    }
    */
      
    console.log("TALLENNETTU TIETOKANTAAN SEURAAVAA:  ", ti);
    return ti;    
});

    
    
router.route("/bussidata").post(function(req, res){
var ti = ({bussiID: req.ID, nopeus: req.nopeus, yhteys: req.yhteys});
    console.log('router toimii: ', ti);
    
    
// Save it to database


})

    
});

// RENDERÖIDÄÄN MUUTTUJAT INDEX.PUGIIN!!!
app.get('/valvomo', function (req, res) {
    res.render('index', { title: 'Sensoridata:', message: ti});
    console.log("piri toimii");
});
// 'index' -> minne renderöidään (index.pug)
// {}-sulkujen sisään mitä renderöidään    
    
app.listen(27017, function () {
        //  Start the app on the specific interface (and port).
        var ipaddress = "localhost";
        var port = 27017;
        console.log('kuunnellaan porttia 27017');

    });
    

    
    }

var zapp = new bussiskannaus();
//bussiskannaus.start();

//testi
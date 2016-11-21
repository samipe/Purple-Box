var mongoose = require('mongoose');
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
app.set('view engine', 'pug');

app.use(express.static('public'));

var bussiskannaus = function(){
    app.use( bodyParser.json() );       // to support JSON-encoded bodies ty7vcytv
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
//app.use(express.json());
// Connect to MongoDB and create/use database called todoAppTest
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bussidata');
// Create a schema
var bussiskeema = new mongoose.Schema({
    APP_ID: String,
    DEV_ID: Number,
    nopeus: Number,
    yhteys: String,
	GPS: String,
    TimeStamp: String,
    viimeisin_tieto: { type: Date, default: Date.now },
});

// Create a model based on the schema
var Todo = mongoose.model('bussidataa', bussiskeema);

var tiedot = mongoose.model('tiedot', bussiskeema);

var dataEntry; // alustetaan muuttuja datalle

// getataan data index.html -sivulle    
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
//DATAN VASTAANOTTO
app.post('/bussidata', function (req, res) {
    dataEntry = new tiedot({APP_ID: req.body.APP_ID, DEV_ID: req.body.DEV_ID, nopeus: req.body.nopeus, yhteys: req.body.yhteys, GPS: req.body.GPS, TimeStamp: req.body.TimeStamp});
    console.log('Seuraavaa sensoridataa vastaanotettu: ', req.body)
    res.status(451).send(" ");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res){
    res.json(dataEntry)        
            })

   // dataEntry.save(function(err){
     //   if(err)
       //     console.log(err);
       // else
        //    console.log("...tieto tallennettu tietokantaan \n \n");
        //    return dataEntry;
//    });

    //Datan lähetys selaimelle
            io.emit('APP_ID' +dataEntry.APP_ID, ('DEV_ID: ' + dataEntry.DEV_ID + '\r\n GPS: ' + dataEntry.GPS + ', Nopeus: ' + dataEntry.nopeus + ', Yhteys: ' + dataEntry.yhteys + ', Viimeisin tieto: ' + dataEntry.TimeStamp));
    console.log("Tiedot Lähetetty indeksiin " + dataEntry.APP_ID);
        
    
    router.route("/bussidata").post(function(req, res){
    var dataEntry = ({APP_ID: req.APP_ID, nopeus: req.nopeus, yhteys: req.yhteys, GPS: req.GPS, TimeStamp: req.TimeStamp});
        console.log('Osoite /bussidata auki tiedon lähetykselle');
 })
   
    
});
    

http.listen(3000, function(){
    console.log('Kuunnellaan porttia 3000');
});
    
}

var zapp = new bussiskannaus();
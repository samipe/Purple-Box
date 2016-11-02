var mongoose = require('mongoose');
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
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

var ti; // alustetaan muuttuja ti

// getataan data index.html -sivulle    
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/bussidata', function (req, res) {
    ti = new tiedot({bussiID: req.body.ID, nopeus: req.body.nopeus, yhteys: req.body.yhteys});
    console.log('pitäisi näkyä kännyposti tässä: ', req.body)
    res.status(451).send("moi");
    // tulostettava data:
    /*
    if(ti.bussiID === 1) {
         io.emit('bussiID1', ('ID: ' + ti.bussiID + ', Nopeus: ' + ti.nopeus + ', Yhteys: ' + ti.yhteys + ', Viimeisin tieto: ' + ti.viimeisin_tieto));
    } else {
        io.emit('bussiID2', ('ID: ' + ti.bussiID + ', Nopeus: ' + ti.nopeus + ', Yhteys: ' + ti.yhteys + ', Viimeisin tieto: ' + ti.viimeisin_tieto));
    };
    */
    // tehdään sama uudelleen for loopilla:
    for(i = 1; i <= 2; i++) {   // 2: bussien lukumäärä
        if(ti.bussiID === i) {
            io.emit('bussiID' + i, ('ID: ' + ti.bussiID + ', Nopeus: ' + ti.nopeus + ', Yhteys: ' + ti.yhteys + ', Viimeisin tieto: ' + ti.viimeisin_tieto));
        } else {
            console.log('Moi');
        };
    };

    ti.save(function(err){
        if(err)
            console.log(err);
        else
            console.log("TALLENNETTU TIETOKANTAAN SEURAAVAA:  ", ti);
            return ti;
    });

    // Lähetetään data selaimelle
    /*
    if(ti.bussiID === 1) {
        console.log('message1: ' + ti);
        io.on('connection', function(socket) {
            socket.on('bussiID1', function(msg1){
            });
        });
    } else {
        console.log('message2: ' + ti);
        io.on('connection', function(socket) {
            socket.on('bussiID2', function(msg2){
            });
        });
    };
    */
    // Tehdään sama uudelleen for loopilla:
    for(i = 1; i <= 2; i++) {   // 2: bussien lukumäärä
        if(ti.bussiID === i) {
        console.log('message: ' + ti);
        var msg;
        var msg = msg + i;    
        io.on('connection', function(socket) {
            socket.on('bussiID' + i, function(msg){
            });
        });
        } else {
            console.log('Moi');
        };
    };
    
    router.route("/bussidata").post(function(req, res){
    var ti = ({bussiID: req.ID, nopeus: req.nopeus, yhteys: req.yhteys});
        console.log('router toimii: ', ti);

    // Save it to database
    })
    
});
    
app.listen(3000, function () {
    //  Start the app on the specific interface (and port).
    var ipaddress = "localhost";
    var port = 3000;
    console.log('kuunnellaan porttia 3000');
});

http.listen(3001, function(){
    console.log('listening on *;3001');
});
    
}

var zapp = new bussiskannaus();
//bussiskannaus.start();
var mongoose = require('mongoose');
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
app.set('view engine', 'pug');

app.use(express.static('public'));

var bussiskannaus = function () {
    app.use(bodyParser.json());       // to support JSON-encoded bodies ty7vcytv
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    //app.use(express.json());
    // Connect to MongoDB and create/use database called todoAppTest
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/bussidata');
    // Create a schema
    var bussiskeema = new mongoose.Schema({
        app_id: String,
        dev_id: Number,
        timeStamp: String,
        location: Object,
        coordinates: Array,
        speed: Number,
        heading: String,
        altitude: Number,
        maxDecibel: Number,
        acceleration: Array,
        stepCounter: Number,
        battery: Number,
        msg: String,
        storage: String,
        lastLogTimer: { type: Date, default: Date.now }
    });

    // Create a model based on the schema
    var Todo = mongoose.model('bussidataa', bussiskeema);

    var tiedot = mongoose.model('tiedot', bussiskeema);

    var dataEntry; // alustetaan muuttuja datalle

    // getataan data index.html -sivulle    
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });
    //DATAN VASTAANOTTO
    app.post('/bussidata', function (req, res) {
        dataEntry = {
            "app_id": req.body.app_id,
            "dev_id": req.body.dev_id,
            "timeStamp": req.body.timeStamp,
            "location": req.body.location,
            "audio": req.body.audio,
            "motionsensor": req.body.motionsensor,
            "device": req.body.device
        };
        console.log('Seuraavaa sensoridataa vastaanotettu: ', req.body);
        console.log('Klientille lähtee: ', dataEntry);
        res.status(451).send(" ");

        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.get('/', function (req, res) {
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
        //io.emit('APP_ID' +dataEntry.APP_ID, (':DEV_ID:' + dataEntry.DEV_ID + ':GPS:' + dataEntry.GPS + ':Nopeus:' + dataEntry.nopeus + ':Viesti:' + dataEntry.viesti + ':Viimeisin tieto:' + dataEntry.timeStamp));
        //console.log("Tiedot Lähetetty indeksiin " + dataEntry.APP_ID);
        
        io.emit('itku', dataEntry);
        console.log("Tiedot Lähetetty kanavaan " + dataEntry.app_id + " laitenumerolla " + dataEntry.dev_id);


        // router.route("/bussidata").post(function(req, res){
        // var dataEntry = ({APP_ID: req.APP_ID, nopeus: req.nopeus, Viesti: req.viesti, GPS: req.GPS, TimeStamp: req.TimeStamp});
        //     console.log('Osoite /bussidata auki tiedon lähetykselle');
        //})


    });


    http.listen(3000, function () {
        console.log('Kuunnellaan porttia 3000');
    });

}

var zapp = new bussiskannaus();
var bussiskeema = function(new mongoose.Schema({
    bussiID: Number,
    nopeus: Number,
    yhteys: String,
	GPS: String,
    viimeisin_tieto: { type: Date, default: Date.now },
});
const mongoose=require('mongoose')
const SchemadbCinema = mongoose.Schema;

require('mongoose').set('debug', true)

//Collection "evenement"
const evenement = new SchemadbCinema({

    imagePath:{type:String,require:true},
    nom:{type:String,require:true},
    description: {type:String,require:true},
    Datee:{type:String,require:true},
    nombrePlace: {type:Number, default:-1},
    SalleEvenement:{type:String,require:true},
   
   
});

var evenementModel = mongoose.model('evenement', evenement);
module.exports=evenementModel;
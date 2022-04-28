const mongoose=require('mongoose')
const SchemadbPaiement = mongoose.Schema;

require('mongoose').set('debug', true)


//Collection"paiement"
const paiement = new SchemadbPaiement({

    nom:{type:String,require:true},
    prenom:{type:String,require:true},
    email:{type:String,require:true},
    numcar:{type:Number,require:true},
    mois:{type:Number,require:true},
    annee:{type:Number,require:true},
    cvv:{type:Number,require:true}

});

var paiementModel = mongoose.model('paiement', paiement);
module.exports=paiementModel;
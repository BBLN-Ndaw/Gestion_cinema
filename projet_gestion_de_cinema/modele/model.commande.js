const mongoose=require('mongoose')
const SchemadbCinema = mongoose.Schema;

require('mongoose').set('debug', true)

//Définition des champs de la table
const commande = new SchemadbCinema({

    imagePath:{type:String,require:true},
    titre: {type:String,require:true},
    description:{type:String,require:true},
    prix: {type:Number, default:-1, required : true},
   
});

var commandeModel = mongoose.model('commande', commande);
module.exports=commandeModel;
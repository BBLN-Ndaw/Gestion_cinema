const mongoose=require('mongoose')
const SchemadbCinema = mongoose.Schema;

require('mongoose').set('debug', true)

//collection users Admin
const userAdmin = new SchemadbCinema({

    login:{type:String,require:true},
    mdp: {type:Number, require:true}

});

var userAdminModel = mongoose.model('userAdmin', userAdmin);
module.exports=userAdminModel;
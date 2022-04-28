const mongoose=require('mongoose')
const SchemadbCinema = mongoose.Schema;

require('mongoose').set('debug', true)

//Collection users
const user = new SchemadbCinema({

    name:{type:String,require:true},
    email:{type:String,require:true},
    password: {type:String, require:true}

});

var userModel = mongoose.model('user', user);
module.exports=userModel;
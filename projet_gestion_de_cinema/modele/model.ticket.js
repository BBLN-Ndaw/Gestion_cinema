const mongoose=require('mongoose')
const SchemadbCinema = mongoose.Schema;

require('mongoose').set('debug', true)


//Collection "ticket"
const ticket = new SchemadbCinema({
   
    prix:{type:String,require:true},
    nomfilm:{type:String,require:true},
    nombrePlace: {type:Number, default:-1}
    
});

var ticketModel = mongoose.model('ticket', ticket);
module.exports=ticketModel;
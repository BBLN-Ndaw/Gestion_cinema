const mongoose=require('mongoose');
const url="mongodb://localhost:27017/db-cinema";//L'url pour se connecter à la base dee données

const options={

    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false

};

mongoose.connect(url,options);//Se connecter à la BDD

mongoose.connection.on("connecting",()=>{
    //on écoute l'événement de connection pour faire quelque chose si on se connecte
    console.log("connecting");

});

mongoose.connection.on("error",()=>{
    //On écoute l'événement d'erreur de connection pour quelque klk chose si on se connecte
    console.log("connecting error");
});

mongoose.connection.on("connected",()=>{
    //On écoute l'événement connection reussit pour faire quelque chose si on se connecte
    console.log("connection to database succesfully");
});

mongoose.connection.on("disconnected",()=>{
    //On écoute l'événement déconnecting pour faire quelque chose si on se connecte
    console.log("disconnected");
});

mongoose.connection.on("reconnected",()=>{
    //On écoute l'evenement reconnecting pour faire quelque chose si on se connecte
    console.log("reconnected");
});

module.exports=mongoose.connection;//Renvoie un objet "mongoose.connection" à chaque fois qu'on require ce fichier
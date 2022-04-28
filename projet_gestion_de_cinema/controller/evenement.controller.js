const db=require('../modele/db');
const { eventNames } = require('../modele/model.evenement');
const evenement=require('../modele/model.evenement');

let controller={

    //Affichage de tous les événements présents dans la base de donnée
    getAll :( function(req, res, next) { 
     
        evenement.find({}, function (err, evenement) {

          var machin=evenement;
          console.log(machin.imagePath);
          if (err) return handleError(err);
          res.render('afficheEvenement.ejs',{listeEvenement:machin})}

        )}),
      
        //Affichage d'un événement
      getOne :( function(req, res, next) { 

       let nomm=req.param('id');
        evenement.findOne({nom:nomm}, function (err, evenement) {

          var machin=evenement;
          if (err) return handleError(err);
           res.render('AfficheOneEvenement.ejs',{listeEvenement:machin})}

        )}),

       //Redirection vers la page d'achat des tickets 
      achatTicket:((req,res)=>{

       var nom = req.param('id')
       res.redirect("/user/ticket/?achat="+nom+"/")

      }),
      
      // Ajout d'un événement
     addOne :( function(req, res, next) { 

       var evenementSaisie = new evenement({imagePath : req.body.imagePath,nom : req.body.nom, description: req.body.description, Datee : req.body.Datee,nombrePlace : req.body.nombrePlace,SalleEvenement : req.body.SalleEvenement});
      
       evenementSaisie.save(function (err, evenements) {

            if (err) { throw err; }
          });
      }),

      //Suppression de tous les événements
      deleteAll :( function(req, res, next) { 

        evenement.deleteMany({}, function (err, evenement) {

          if (err) return handleError(err);
          
        })
      }),

      // Suppression d'un événement via l'id de l'événement
      deleteOne :( function(req, res, next) { 

        evenement.findOneAndRemove(req.params.id, function (err, evenement) {

          if (err) return handleError(err);
          
        });
      }),
   
      // Mise à jour d'un événement
      updateOne :( function(req, res, next) { 

        var evenementModifié = new evenement({imagePath : req.body.imagePath, nom : req.body.nom, description: req.body.description, Datee : req.body.Datee,nombrePlace : req.body.nombrePlace,SalleEvenement : req.body.SalleEvenement}); 
       
        evenement.findOneAndUpdate(req.params.nom, evenementModifié, function (err, evenement) {

             if (err) { throw err; }

           });
       }),
    
   };
   
   module.exports = controller;
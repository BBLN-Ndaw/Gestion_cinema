const db=require('../modele/db');
const userAdmin=require('../modele/model.userAdmin');

let controllerUser={
    
  //Affichage de la page permettant d'afficher tous les événements
    getAll :( function(req, res, next) { 

     userAdmin.find({}, function (err, userAdmins) {
          
          var machin=userAdmins;
          if (err) return handleError(err);
          res.render('afficheEvenement.ejs',{ListeUseramin:machin})}

        )}),
      
    //Affichage d'un utilisateur Admin
    getOne :( function(req, res, next) { 

        userAdmin.findById(req.params.id, function (err, userAdmins) {

          if (err) return handleError(err);
         
        });
      }),
      
    // Ajouter un utilisateur Admin dans la base de donnée
    addOne :( function(req, res, next) { 

       var userAdminsAAjouter = new userAdmin({login : req.body.nom, mdp: req.body.description});

       userAdminsAAjouter.save(function (err, userAdmin) {

            if (err) { throw err; }

          });
      }),

      //Suppression de tous les utilisateurs Admin
    deleteAll :( function(req, res, next) { 

        userAdmin.deleteMany({}, function (err, userAdmins) {

          if (err) return handleError(err);
          
        })
      }),

      //Suppression d'un utilisateur Admin
    deleteOne :( function(req, res, next) { 

        userAdmin.findOneAndRemove(req.params.id, function (err, userAdmins) {

          if (err) return handleError(err);
          
        });
      }),
   
    // Mise à jour des informations d'un utilisateur Admin
    updateOne :( function(req, res, next) { 

        var UserModifier = new userAdmin({login : req.body.nom, mdp: req.body.description}); 

        userAdmin.findOneAndUpdate(req.params.id, UserModifier, function (err, UserModifier) {

             if (err) { throw err; }
            
           });
       }),
    
    
   };
   
   module.exports = controllerUser;
const db=require('../modele/db');
const { eventNames } = require('../modele/model.evenement');
const evenement=require('../modele/model.evenement');


let controller={

  //Ajout d'un nouvel événement par l'utilisateur Admin
  addOne :( function(req, res, next) { 

    //Empêcher l'utilisateur de laisser des champs vide lors d'insertion dans la base de donnée
    if(req.body.nom===""||req.body.description===""||req.body.Datee===""||req.body.nombrePlace===""||req.body.SalleEvenement==="")
    {
        //Redirection vers la page permettant d'ajouter des événements
        res.redirect("/admin/Ajouterevenement")
        return;
    }
      //Enregistrement de l'événement saisie dans la base de donnée
      var evenementSaisie = new evenement({nom : req.body.nom, description: req.body.description, Datee : req.body.Datee,nombrePlace : req.body.nombrePlace,SalleEvenement : req.body.SalleEvenement});
      evenementSaisie.save(function (err, evenements) {
          if (err) { throw err; }
            res.send('Evénement ajouté !')
        });
    }),

  //Redirection vers la page d'ajouter événement juste après sa connexion
  getone:(checkAdminAuthenticated,(req, res) => {
      res.render('evenement.ejs')//page créer evenement
      
    }),

}

//Permet de vérifier si l'utilsiateur est encore connecté
function checkAdminAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
}


module.exports=controller;
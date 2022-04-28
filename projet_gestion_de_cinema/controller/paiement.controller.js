const db=require('../modele/db');
const { eventNames } = require('../modele/model.paiement');
const paiement=require('../modele/model.paiement');


let controller={

  // Ajout des informations concernant un paiement effectué dans la base de donnée
  addOne :( function(req, res, next) { 

    if(req.body.nom===""||req.body.prenom===""||req.body.email===""||req.body.numcar===""||req.body.mois===""||req.body.annee===""||req.body.cvv==="")
    {
       res.redirect("/paiement")
      return;
    }
      var cbSaisie = new paiement({nom : req.body.nom,prenom : req.body.prenom, email: req.body.email, numcar : req.body.numcar,mois : req.body.mois, annee : req.body.annee, cvv : req.body.cvv });
      
      cbSaisie.save(function (err, paiement) {

          if (err) { throw err; }
          var nomFilm = req.param("nom")
          res.redirect("/user/?historique="+nomFilm)
          

        });
    }),
    // Redirection vers la page de paiement par CB
  getOne :( function(req, res, next) { 
      
    res.render('paiement.ejs')
    
    }),
}
module.exports = controller;
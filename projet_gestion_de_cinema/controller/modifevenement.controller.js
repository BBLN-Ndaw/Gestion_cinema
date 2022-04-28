const db=require('../modele/db');
const { eventNames } = require('../modele/model.evenement');
const evenement=require('../modele/model.evenement');
const methodOverride = require('method-override')
const express = require('express');
const { deleteOne } = require('./evenement.controller');

var app = express()

app.use(methodOverride('_method'))


let controller={

// Modifier un événement
  addOne :( function(req, res, next) { 

    if(req.body.nom===""||req.body.description===""||req.body.Datee===""||req.body.nombrePlace===""||req.body.SalleEvenement==="")
    {

      res.redirect("/admin/Ajouterevenement")
      return;

    }
      var evenementSaisie = new evenement({nom : req.body.nom, description: req.body.description, Datee : req.body.Datee,nombrePlace : req.body.nombrePlace,SalleEvenement : req.body.SalleEvenement});
      
      evenementSaisie.save(function (err, evenements) {

          if (err) { throw err; }
          res.send('Evénement ajouté !')

        });
    }),

    //Affichage des événements pouvant être modifiés
  getAll :( function(req, res, next) { 
    
       evenement.find({}, function (err, evenement) {

         var machin=evenement;
         if (err) return handleError(err);
         res.render('listevenement.ejs',{listeEvenement:machin})}

       )}),

    // Mofifier un événement par l'Admin
  updateOne :( function(req, res, next) { 

      res.render('modifEvenement.ejs');
      let nomm=req.param('id');

      evenement.findOne({nom:nomm}, function (err, evenement) {

          var machin=evenement;
          
           });
       }),
  
}
module.exports=controller;
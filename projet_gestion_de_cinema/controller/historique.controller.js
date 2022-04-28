const { model } = require('../modele/db');
const db = require('../modele/db');
const { eventNames } = require('../modele/model.ticket');
const ticket = require('../modele/model.ticket');
const evenement = require('../modele/model.evenement');

let controller={

    // Affichage de l'historique des commandes de ticket
      getAll :(function(req, res, next) {

        var evenementAcheter=(req.param('historique').replace("/",""))

          ticket.findOne({nomfilm:evenementAcheter}, function (err, ticket) {

            var ticketTrouve=ticket;
            if (err) 
            {return}

          console.log(ticketTrouve)

          //Recherche de l'événement associé au ticket acheté
           evenement.findOne({nom:evenementAcheter}, function (err, evenementtt) {
             
            var evenementTrouve=evenementtt;
            console.log("Evénement : "+evenementTrouve)
            if (err) 
            {  return }
        })
         
        })     
        res.render('historiqueAchat.ejs') 
    })
 }
module.exports = controller;
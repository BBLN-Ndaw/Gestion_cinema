const db=require('../modele/db');
const { eventNames } = require('../modele/model.ticket');
const ticket=require('../modele/model.ticket');
const evenement=require('../modele/model.evenement');

let controller={
      
      getOne :( function(req, res, next) {
        res.render('achatTicket.ejs')}),
        addOne :( function(req, res, next) { 
          let nomFilm= req.param('achat').replace("/","")
          console.log("post ticket   " + req.param('achat').replace("/",""))
          if(req.body.nombrePlace===""){
             var prix="";
              res.redirect("/user/ticket/?achat="+prix+"/")
                return
               }

              var prix= parseInt(req.body.nombrePlace)*12;
                var ticketSaisie = new ticket({prix : prix, nomfilm: nomFilm, nombrePlace : req.body.nombrePlace });
                ticketSaisie.save(function (err, ticket) {
                    if (err) { throw err; }
                    //Find evenement achete
                evenement.findOne({nom:nomFilm}, function (err, evenementtt) {
                  var evenementTrouve=evenementtt;
                  console.log("achete "+evenementTrouve)
                  if (err) 
                  {  return }
                        //Update evenement achete
                        var nombrePaceRestant=evenementTrouve.nombrePlace-req.body.nombrePlace;
                        if(nombrePaceRestant>0){
                        console.log("nb place "+ nombrePaceRestant)
                        var evenementModifié = new evenement({_id:evenementTrouve._id, imagePath : evenementTrouve.imagePath, nom : evenementTrouve.nom, description: evenementTrouve.description, Datee : evenementTrouve.Datee,nombrePlace :nombrePaceRestant ,SalleEvenement :evenementTrouve.SalleEvenement}); 
                        evenement.findOneAndUpdate(req.params.nom, evenementModifié, function (err, evenement) {
                            if (err) { throw err; }
                            console.log('Evenement modifié!');
                          });
                          }
                          else
                          {
                            console.log("il n\'y a plus de tickets disponibles");
                          }
                        })
                      
                      res.redirect("/paiement/?nom="+nomFilm)

             });
         }),
   
    
   };
   
   module.exports = controller;
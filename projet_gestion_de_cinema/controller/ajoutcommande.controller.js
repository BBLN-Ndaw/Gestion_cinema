const db=require('../modele/db');
const { eventNames } = require('../modele/model.commande');
const commande=require('../modele/model.commande');

let controller={
    
    getAll :( function(req, res, next) { 
     // res.render('afficheEvenement.ejs',{listEvenement: })}),
        commande.find({}, function (err, commande) {
          console.log(commande);
          var machin=commande;
          if (err) return handleError(err);
          res.render('ajoutcommande.ejs',{listcommande:machin})}
        )}),
      
      getOne :( function(req, res, next) { 
        let idCom=req.params.id;
        commande.findById(idCom, function (err, commande) {
          var machin=commande;
          console.log(machin+"  machin");
          if (err) 
          {console.log("erreur")
        return
      }
      res.render('ajoutcommande.ejs',{listcommande:machin})}

        )}),
      
      
     addOne :( function(req, res, next) { 
       var commandeSaisie = new commande({imagePath: req.body.imagePath, titre: req.body.titre, description : req.body.description,prix : req.body.prix});
       commandeSaisie.save(function (err, commande) {

            if (err) { throw err; }

          });
      }),

      deleteAll :( function(req, res, next) { 
        commande.deleteMany({}, function (err, commande) {
          if (err) return handleError(err);
          console.log(commande)
        })
      }),

      deleteOne :( function(req, res, next) { 
        commande.findOneAndRemove(req.params.id, function (err, commande) {
          if (err) return handleError(err);
          console.log(commande)
        });
      }),
   
      /*updateOne :( function(req, res, next) { 

        //Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)
        var evenementModifié = new evenement({nom : req.body.nom, description: req.body.description, Datee : req.body.Datee,nombrePlace : req.body.nombrePlace,SalleEvenement : req.body.SalleEvenement}); 
        evenement.findOneAndUpdate(req.params.id, evenementModifié, function (err, evenement) {
             if (err) { throw err; }
             console.log('Evenement modifié!');
           });
       }),*/
    
    
    
    
   };
   
   module.exports = controller;
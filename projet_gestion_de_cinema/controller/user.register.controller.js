const db=require('../modele/db');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('../passport-config')
const users=require('../modele/model.user');

express=require('express')

app=express()

if (process.env.NODE_ENV !== 'production') {

    require('dotenv').config()

  }
  

  initializePassport(

    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  
    )
  

  app.use(flash())

  app.use(session({

    secret: 'secret',
    resave: false,
    saveUninitialized: false

  }))

  app.use(passport.initialize())
  app.use(passport.session())


let controller={
  //Inscription de l'utilisateur
  getUserregister : (checkNotAuthenticated,(req, res) => {

                 res.render('register.ejs')

         }),


         psotUserResgister: (checkNotAuthenticated, async (req, res) => {
            try {

              const hashedPassword = await bcrypt.hash(req.body.password, 10)
              var userInscrit = new users({ name: req.body.name,  email: req.body.email, password: hashedPassword});
             
                userInscrit.save(function (err, userEnregistrer) {

                  if (err) { throw err; }
                  
                });
                
                res.redirect('/login')

          } catch {

              res.redirect('/register')

              }
            })
          
}

function checkNotAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {

      return res.redirect('/evenement')
      
    }
    next()
  }

module.exports=controller;
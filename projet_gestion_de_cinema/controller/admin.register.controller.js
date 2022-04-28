const db=require('../modele/db');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('../passport-config')

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
  
  const users = []

  app.use(flash())
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())


let controller={

  //Redirection vers la page d'inscription adMIN
  getadminregister : (checkNotAdminAuthenticated,(req, res) => {
             res.render('adminRegister.ejs')
         }),

        
         psotAdminResgister: (checkNotAdminAuthenticated, async (req, res) => {
            try {
              // Chiffrement du mot de passe
              const hashedPassword = await bcrypt.hash(req.body.password, 10)
              //Création de l'utilisateur dans la base de donnée
              users.push({ 
                id: Date.now().toString(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
              })
              res.redirect('/admin/login')//S'il s'est inscrit, on le redirige vers la connexion
            } catch {
              res.redirect('/admin/register')//S'il y'a un probléme on le redirige vers la même page
            }
          })
}

function checkNotAdminAuthenticated(req, res, next) {
  // S'il est authentifié , il est redirigé vers la page d'accueil
  if (req.isAuthenticated()) {
    return res.redirect('/admin/Ajouterevenement')
  }
  next()
}

module.exports=controller;
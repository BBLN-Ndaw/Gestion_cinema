var bodyParser = require('body-parser')

express=require('express')
const db=require('../modele/db');
const bcrypt = require('bcrypt')
const passport = require('passport') // Utiliser lors de l'authentification
const flash = require('express-flash')// Utiliser pour les messages d'erreur
const session = require('express-session')// Utiliser pour les sessions lors des connexion admin/utilisateur
const initializePassport = require('../passport-config')// Utiliser le passport lors de la connexion

app.use(bodyParser.urlencoded({ extended: false }));//Permet de recevoir els données lors d'un POST
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app=express()

// Lancement de l'environnement de developpement
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  // Initialisation de la connexion via la recherche du l'email et de l'id du user
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  //Initialisation d'un tableau composé d'un utilisateur
  const users = []

  
  app.use(flash())
  //Incorporationd d'une clé unique par session active
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())


let controller={

  //Permet la connexion de l'admin
  getloginAdmin : ((req, res) => {
          res.render('adminLogin.ejs')
         }),
         postloginAdmin: (checkNotAdminAuthenticated, passport.authenticate('local', { 
           //Si la connexion est réussit on redirige l'utilisateur vers la page "successRedirect" sinon vers la page "failureRedirect"
          successRedirect: '/admin/Ajouterevenement',
          failureRedirect: '/admin/login',
          failureFlash: true
        }))
}
//Permet d'empecher l'accès à certaine page si l'utilisateur n'est pas identifié
function checkNotAdminAuthenticated(req, res, next) {
  
  if (req.isAuthenticated()) {
    return res.redirect('/admin/Ajouterevenement')
  }
  console.log('not authentificated')
  next()
}
module.exports=controller;
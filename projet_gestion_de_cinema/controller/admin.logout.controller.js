const db=require('../modele/db');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
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

  //Sorti de l'user précédemment connecté de la session
  const users = []

  app.use(flash())
  app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())



let adminlogoutController = {
    adminLogout:(req, res) => {
        //Déconnecte l'utilisateur de la session
        req.logOut()
        res.redirect('/admin/login')
      }
    }
    
    
    module.exports =adminlogoutController;
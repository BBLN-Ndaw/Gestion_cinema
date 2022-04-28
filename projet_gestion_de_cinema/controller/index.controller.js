const db = require('../modele/db');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('../passport-config')
express = require('express')

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

    secret:'secret',
    resave: false,
    saveUninitialized: false

  }))
  app.use(passport.initialize())
  app.use(passport.session())

  
let controller={

        getindex : (checkAuthenticated, (req, res) => {

            res.redirect('/*/evenement')}
        )
         
}
function checkAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
      
      return next()
    }
  
    res.redirect('/login')
  }
module.exports=controller;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')


//file requirement
var adminRouter= require('./routes/admin.router');
var evenementRouter= require('./routes/evenement.router');
var achatticketRouter = require('./routes/achatticket.router');
var historiqueRouter = require('./routes/historique.router');
var modifevenementRouter= require('./routes/modifevenement.router');
var paiementRouter= require('./routes/paiement.router');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
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
app.use(methodOverride('_method'))



/* Our defind Middleware*/
app.use('/*/evenement',checkAuthenticated, evenementRouter);
app.use('/admin/Ajouterevenement',checkAdminAuthenticated,adminRouter);
app.use('/user/ticket/*/',checkAuthenticated, achatticketRouter);
app.use('/user/*',checkAuthenticated, historiqueRouter);
app.use('/admin/listevenement/modifEvenement',checkAdminAuthenticated, modifevenementRouter);
app.use('/paiement/*',checkAuthenticated, paiementRouter);


app.get('/UserLogin/connecter/*', checkAuthenticated, (req, res) => {
  let u_ser=req.param('0')
  res.render('index.ejs',{userEmail:u_ser})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated,passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}),(req,res)=>{
  email=req.body.email;
  res.redirect("/UserLogin/connecter/"+email);
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    if(req.body.email===""||req.body.password==="")
    {
      res.redirect('/register')
      return
    }
    users.push({
      id: Date.now().toString(),
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})
//-------------------------
// admin
//--------------------------
app.get('/admin/connecter/*', checkAdminAuthenticated, (req, res) => {
  res.render('adminIndex.ejs')
})

app.get('/admin/login', checkNotAdminAuthenticated, (req, res) => {
  res.render('adminLogin.ejs')
})

app.post('/admin/login', checkNotAdminAuthenticated, passport.authenticate('local', {
  failureRedirect: '/admin/login',
  failureFlash: true
}),(req,res)=>{
  email=req.body.email;
  res.redirect("/admin/connecter/"+email);
})

app.get('/admin/register', checkNotAdminAuthenticated, (req, res) => {
  res.render('adminRegister.ejs')
})

app.post('/admin/register', checkNotAdminAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    if(req.body.nom===""||req.body.email===""||req.body.password==="")
    {
      res.redirect('/admin/register')
      return
    }
    users.push({
      id: Date.now().toString(),
      name: req.body.nom,
      email: req.body.email,
      password: hashedPassword
    })
    console.log("ok  "+ users.email)
    res.redirect('/admin/login')
  } catch {
    res.redirect('/admin/register')
  }
})
app.delete('/admin/logout', (req, res) => {
  req.logOut()
  res.redirect('/admin/login')
})
//-------------------
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})
//suppresion evenement
const evenement=require('./modele/model.evenement');
app.delete('/*', (req, res) => {
  let nomEvenement=req.param('0');
  evenement.deleteOne({ nom:nomEvenement }, function (err) {
    if(err) return handleError(err);
  });
  res.redirect('/admin/listevenement/modifEvenement');
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/UserLogin/connecter/user')
  }
  next()
}
//admin
function checkAdminAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  console.log("nonnnn")
  res.redirect('/admin/login')
}

function checkNotAdminAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/admin/connecter/admin')
  }
  next()
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



const LocalStrategy = require('passport-local').Strategy //Utilsation de stratégie local (on ne se base pas sur la stratégie de quelqu'un d'autre du type facebook, ect...)
const bcrypt = require('bcrypt')// Chiffrage de mot de passe

// Initialiser le passport pour la connexion
function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    // Récupération des informations à partir d'un email
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    // Chiffrement du mot de passe
      try {
        if (await bcrypt.compare(password, user.password)) {
              return done(null, user)
      } else {
              return done(null, false, { message: 'Password incorrect' })
              }
      } catch (e) {
             return done(e)
      }
  }
  
  // Incorporation des informations dans la session
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id)) //Serialisation = Utiliser(mettre) information de la session
  passport.deserializeUser((id, done) => { // Désérialisation = Enlever les informations de la session
    return done(null, getUserById(id))
  })
}

module.exports = initialize
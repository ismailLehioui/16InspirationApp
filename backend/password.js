const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const { UserModel } = require('./models/users.models'); // Assurez-vous d'importer correctement votre modèle utilisateur

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"]
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Vérifiez si l'utilisateur existe déjà dans la base de données
                let user = await UserModel.findOne({ googleId: profile.id });

                if (user) {
                    // L'utilisateur existe déjà, le retourner
                    done(null, user);
                } else {
                    // Créer un nouvel utilisateur
                    user = await UserModel.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        // image: profile.photos[0].value,
                    });
                    done(null, user);
                }
            } catch (err) {
                done(err, null); // Gérer l'erreur
            }
        }
    )
);

// Sérialisation de l'utilisateur
passport.serializeUser((user, done) => {
    done(null, user.id); // Conservez uniquement l'ID de l'utilisateur
});

// Désérialisation de l'utilisateur
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id); // Rechercher l'utilisateur par ID
        done(null, user); // Renvoyer l'utilisateur
    } catch (err) {
        done(err, null);
    }
});

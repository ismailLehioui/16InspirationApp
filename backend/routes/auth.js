const express = require('express');
const authRouter = express.Router(); // Initialiser le routeu
const passport = require('passport');



authRouter.get("/login/success", (req, res) => {
    if(req.user){
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user
        })
    }else{
        res.status(403).json({error: true, message: "Not Authorized"})
    }
})

authRouter.get("/login/failed", (req, res ) => {
    res.status(401).json({
        error: true,
        message: "Login in failure"
    })
}
)

authRouter.get(
    "/google/callback",
    passport.authenticate("google",{
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed"
    })
)

authRouter.get("/google", passport.authenticate("google",["profile","email"]));

// authRouter.get("/logout", (req, res) => {
//     req.logout(),
//     res.redirect(process.env.CLIENT_URL);
// })
authRouter.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect(process.env.CLIENT_URL);
    });
});


module.exports = {
    authRouter
};
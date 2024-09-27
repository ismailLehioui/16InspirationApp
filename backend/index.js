const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/users.routes");
const { courseRoute } = require("./routes/courses.route");
const { videoRoute } = require("./routes/videos.route");
const cors = require('cors')
const passportSetup = require('./password')
const passport = require('passport');  // <-- Ajoutez cette ligne

const authRoute = require('./routes/auth')
const session = require("express-session");


require("dotenv").config('./.env');
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors())
// Configuration d'express-session
app.use(session({
  secret: process.env.CLIENT_SECRET,  // Vous pouvez définir une clé secrète plus forte
  resave: false,  // Ne pas enregistrer la session si elle n'a pas été modifiée
  saveUninitialized: true,  // Sauvegarder une session non initialisée
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // Durée de vie du cookie (1 jour)
  }
}));

// Initialiser Passport et sessions Passport
app.use(passport.initialize());
app.use(passport.session());



app.use(express.json());

app.use("/users", userRouter);

app.use("/courses", courseRoute);

app.use("/videos", videoRoute);

app.use("/auth", authRoute)

app.get("/regenerateToken", (req, res) => {
  const rToken = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(rToken, "ARIVU");

  if (decoded) {
    const token = jwt.sign(
      { userId: decoded.userId, user: decoded.user },
      "arivu",
      {
        expiresIn: "7d",
      }
    );
    res.status(201).json({ msg: "token created", token });
  } else {
    res.status(400).json({ msg: "not a valid Refresh Token" });
  }
});

app.get('/', (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to 16Inspiration's Backend" })
  } catch (err) {
    res.status(400).json({ message: "Some Error Occur. Please Refresh" });
  }
})

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`connected to db`);
    console.log(`connected to port ${process.env.port}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
});

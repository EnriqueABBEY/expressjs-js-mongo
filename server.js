const express = require("express");
const connectdb = require("./src/config/database");
const dotenv = require('dotenv').config();
const port = 8000;

//conexion base de données
connectdb();

const app = express();

//middleware pour les traiter les données des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes du projet
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/posts", require("./src/routes/post.routes"));
app.use("/api/users", require("./src/routes/user.routes"));

app.listen(port, () => console.log(`Server listenning on port ${port}`));
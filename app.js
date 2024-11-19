const express = require("express");
const dotenv = require("dotenv");
const handlebars = require("express-handlebars");
const helpers = require("./utils/helpers.js"); //require helper functions

dotenv.config();
const PORT = process.env.PORT;

const app = express();

const session = require("express-session");

app.use(session({
    secret: "This is a secret!",
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hbs = handlebars.create({
    extname: '.hbs',
    helpers: helpers    //include helper functions
});

app.engine('.hbs', hbs.engine);
app.set("views", "./views");
app.set("view engine", ".hbs");

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, function() {
    console.log(`Weathertop running and listening on port ${PORT}`);
});

module.exports = app;

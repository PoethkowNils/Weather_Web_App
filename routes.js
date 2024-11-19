const express = require("express");
const auth = require("./utils/auth.js"); 
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const city = require("./controllers/city.js");
const accounts = require("./controllers/accounts.js");

router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get("/", home.index);
router.get("/dashboard", auth.protected, dashboard.index);
router.get("/city/:name", auth.protected, city.index );
router.get("/city/:name/deletereading/:id", auth.protected, city.deleteReading);
router.get("/dashboard/deletecity/:name", auth.protected, dashboard.deleteCity);
router.post("/city/:name/addreading", auth.protected, city.addReading);
router.post("/dashboard/addcity", auth.protected, dashboard.addCity);

module.exports = router;
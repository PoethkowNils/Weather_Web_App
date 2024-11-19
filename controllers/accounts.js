const userstore = require("../models/user-store.js");
const logger = require("../utils/logger.js");

const accounts = {
    login(request, response) {
        const viewData = {
            title: "Login to the Service"
        };
        response.render("/", viewData);
    },

    logout(request, response) {
        request.session.destroy();
        response.redirect("/");
    },

    signup(request, response) {
        const viewData = {
            title: "Signup for the Service"
        };
        response.render("signup", viewData);
    },

    async register(request, response) {
        const user = request.body;
        await userstore.addUser(user);
        logger.info("Registering user", user);
        response.redirect("/");
    },

    async authenticate(request, response) {
        let user = await userstore.authenticateUser(request.body.email, request.body.password);
        if (user) {
            request.session.user = user.id;
            logger.info("User successfully authenticated and added to session", user);
            response.redirect("/dashboard");
        } else {
            response.redirect("/");
        }
    },

    async getCurrentUser(request) {
        const user = request.session.user;
        return await userstore.getUserById(user);
    }
};

module.exports = accounts;
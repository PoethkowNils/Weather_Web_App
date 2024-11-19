const logger = require("../utils/logger.js");

const home = {
  index(request, response) {
    logger.info("home rendering");
    const viewData = {
      title: "Welcome to Weathertop!"
    };
    response.render("index", viewData);
  },
};

module.exports = home;
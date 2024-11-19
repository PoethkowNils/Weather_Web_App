const logger = require("../utils/logger.js");
const citiesStore = require("../models/cities-store.js");
const readingStore = require("../models/readings-store.js");
const accounts = require("./accounts.js"); 

const dashboard = {
  async index(request, response) {
    const loggedInUser = await accounts.getCurrentUser(request);
    const cities = await citiesStore.getCities(loggedInUser.id);

    let cityData = [];

    for (const city of cities) {
      const readings = await readingStore.getReadingsForCity(city.name, loggedInUser.id);
      
      let maxTemperature = null;
      let minTemperature = null;
      let maxWindSpeed = null;
      let minWindSpeed = null;
      let minAirPressure = null;
      let maxAirPressure = null;

      //Hier muss noch über alle Tage iteriert werden

      if (readings.length >= 1) {
        maxTemperature, minTemperature = readings[0].temperature;
        maxWindSpeed, minWindSpeed = readings[0].wind_speed;
        maxAirPressure, minAirPressure = readings[0].air_pressure;

        for (const reading of readings) {
            let data = [reading.temperature, reading.wind_speed, reading.air_pressure];

            if (maxTemperature<data[0]) maxTemperature=data[0];
            if (minTemperature>data[0]) minTemperature=data[0];
            if (maxWindSpeed<data[1]) maxWindSpeed=data[1];
            if (minWindSpeed>data[1]) minWindSpeed=data[1];
            if (minAirPressure>data[2]) minAirPressure=data[2];
            if (maxAirPressure<data[2]) maxAirPressure=data[2]; 
        }
    }

      cityData.push({
          city,
          maxTemperature,
          minTemperature,
          maxWindSpeed,
          minWindSpeed,
          minAirPressure,
          maxAirPressure,
          latestReading: readings[0],
          previousReading: readings[1]
      });
    }
    const viewData = {
      title: "Dashboard",
      cities: cityData
    };
    logger.info("about to render dashboard", cities);
    response.render("dashboard", viewData);
  },
  async deleteCity(request, response) {
    const cityName = request.params.name;
    logger.debug("Deleting City", cityName);
    await citiesStore.removeCity(cityName);
    response.redirect("/dashboard");
  },
  async addCity(request, response) {
    const loggedInUser = await accounts.getCurrentUser(request);
    console.log(loggedInUser.id);
    const newCity = {
      userid: loggedInUser.id,
      name: request.body.name,
      longitude: request.body.longitude,
      latitude: request.body.latitude
    };
    logger.debug("Creating a new City", newCity);
    await citiesStore.addCity(newCity);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
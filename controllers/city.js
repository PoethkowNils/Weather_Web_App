const logger = require('../utils/logger.js');
const citiesStore = require('../models/cities-store.js');
const readingStore = require('../models/readings-store.js');
const accounts = require("./accounts.js"); 

const city = {
    async index(request, response) {
        const loggedInUser = await accounts.getCurrentUser(request);
        console.log(loggedInUser);
        const cityName = request.params.name;
        const readings = await readingStore.getReadingsForCity(cityName, loggedInUser.id);
        const city = await citiesStore.getCity(cityName, loggedInUser.id);

        let cityData = [];
        
        let maxTemperature = null;
        let minTemperature = null;
        let maxWindSpeed = null;
        let minWindSpeed = null;
        let maxAirPressure = null;
        let minAirPressure = null;

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
            previousReading: readings[1],
            readings: true,
        });
        
        const viewData = {
            title: 'City',
            name: cityName,
            cities: cityData,
            readings: readings
        };
        logger.info('City name = ' + cityName);
        response.render('city', viewData);
    },
    async deleteReading(request, response) {
        const cityName = request.params.name;
        const id = request.params.id;
        logger.debug(`Deleting Readind ${id} from City ${cityName}`);
        await readingStore.removeReading(cityName, id);
        response.redirect("/city/" + cityName);
    },
    async addReading(request, response) {
        const cityName = request.params.name;
        const loggedInUser = await accounts.getCurrentUser(request);
        const newReading = {
            weather: request.body.weather,
            temperature: request.body.temperature ,
            windSpeed: request.body.windSpeed,
            windDirection: request.body.windDirection,
            pressure: request.body.pressure
        };
        logger.debug("New Reading", newReading);
        await readingStore.addReading(cityName, loggedInUser.id, newReading);
        response.redirect("/city/" + cityName);
    },
};

module.exports = city;
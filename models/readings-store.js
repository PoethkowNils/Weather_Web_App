const dataStore = require("./data-store.js");
const dataStoreClient = dataStore.getDataStore();
const logger = require("../utils/logger.js");

const readingStore = {
    async getReadingsForCity(cityName, email) {
        const query = 'SELECT * FROM weathertop_readings WHERE name = $1 AND user_id = $2 ORDER BY date DESC;';
        const values = [cityName, email];

        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching days for city" ,e);
        }
    },
    async removeReading(cityName, id) {
        const query = 'DELETE FROM weathertop_readings WHERE name=$1 AND id=$2'; //id is needed for identifying the reading
        const values = [cityName, id];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Unable to remove measurement from city", e);
        };
    },
    async addReading(cityName, email, newReading) {
        const query = 'INSERT INTO weathertop_readings (name, user_id, weather_code, temperature, wind_speed, wind_direction, air_pressure) VALUES($1, $2, $3, $4, $5, $6, $7)';
        const values = [cityName, email, newReading.weather, newReading.temperature, newReading.windSpeed, newReading.windDirection, newReading.pressure];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Error adding Reading", e);
        }
    }
};

module.exports = readingStore;
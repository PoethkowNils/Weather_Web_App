const dataStore = require("./data-store.js");
const dataStoreClient = dataStore.getDataStore();
const logger = require("../utils/logger.js");

const citiesStore = {
  async getCity(cityName, email) {
    const query = 'SELECT * FROM weathertop_cities WHERE name=$1 AND user_id=$2;';
    const values = [cityName, email];
    try {
      let result = await dataStoreClient.query(query, values);
      return result.rows[0];
    } catch (e) {
      logger.error("Error fetching cities", e);
    }
  },
  async getCities(email) {
    const query = 'SELECT * FROM weathertop_cities WHERE user_id=$1;';
    const values = [email];
    try {
      let result = await dataStoreClient.query(query, values);
      return result.rows;
    } catch (e) {
      logger.error("Error fetching cities", e);
    }
  },
  async removeCity(name) {
    const query = 'DELETE FROM weathertop_cities WHERE name=$1';
    const values = [name];
    try {
      await dataStoreClient.query(query, values);
    } catch (e) {    
      logger.error("Unable to remove city: ", e);
    }
  },
  async addCity(newCity) {
    const query = 'INSERT INTO weathertop_cities (user_id, name, longitude, latitude) VALUES ($1,$2,$3,$4)';
    const values = [newCity.userid, newCity.name, newCity.longitude, newCity.latitude];
    try {
      await dataStoreClient.query(query, values);
    } catch (e) {
      logger.error("Error cannot add City", e);
    }
  }
};

module.exports = citiesStore;
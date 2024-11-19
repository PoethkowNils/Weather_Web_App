const dataStore = require("./data-store.js"); 
const dataStoreClient = dataStore.getDataStore(); 
const logger = require("../utils/logger.js"); 
 
const userStore = { 
    async addUser(user) { 
        const query = 'INSERT INTO weathertop_users (email, password, first_name, last_name) VALUES($1, $2, $3, $4)'; 
        const values = [user.email, user.password, user.firstName, user.lastName]; 
        try { 
            await dataStoreClient.query(query, values); 
        } catch (e) { 
            logger.error("Error adding user", e); 
        } 
    }, 
    async authenticateUser(email, password) { 
        const query = 'SELECT * FROM weathertop_users WHERE email=$1 AND password=$2'; 
        const values = [email, password]; 
        try { 
            let dbRes = await dataStoreClient.query(query, values); 
            if (dbRes.rows[0] !== undefined) { 
                return {id: email}; 
            } else { 
                return undefined; 
            } 
        } catch (e) { 
            console.log("Error authenticating user", e); 
        } 
    }, 
    async getUserById(id) { 
        logger.info(`Getting user ${id}`); 
        const query = 'SELECT * FROM weathertop_users WHERE email=$1'; 
        const values = [id]; 
        try { 
            let dbRes = await dataStoreClient.query(query, values); 
            logger.info(`Getting user ${dbRes.rows[0].email}`); 
            if (dbRes.rows[0] !== undefined) { 
                return {id: dbRes.rows[0].email, firstName: dbRes.rows[0].first_name, lastName: dbRes.rows[0].last_name}; 
            } else { 
                return undefined; 
            } 
        } catch (e) { 
            console.log("Error getting user", e); 
        } 
    }, 
}; 
 
module.exports = userStore; 
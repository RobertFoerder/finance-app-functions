const { CosmosClient } = require('@azure/cosmos');
const connectionString = process.env['cosmosDbConnectionString'];
const client = new CosmosClient(connectionString);
const databaseId  = process.env['cosmosDbDatabase'];
const containerId  = process.env['cosmosDbContainer'];

module.exports = {
    getContainer: function() {
        return client.database(databaseId).container(containerId);
    }
}
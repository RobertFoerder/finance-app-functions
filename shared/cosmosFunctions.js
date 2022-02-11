const { CosmosClient } = require('@azure/cosmos');
const connectionString = process.env['cosmosDbConnectionString'];
const client = new CosmosClient(connectionString);
const databaseId  = process.env['cosmosDbDatabase'];
const financeEntriesContainerId  = process.env['cosmosDbFinanceEntriesContainer'];
const accountsContainerId = process.env['cosmosDbAccountsContainer'];
const fixedCostsContainerId = process.env['cosmosDbFixedCostsContainer'];

module.exports = {
    getFinanceEntriesContainer: function() {
        return client.database(databaseId).container(financeEntriesContainerId);
    },
    getAccountsContainer: function() {
        return client.database(databaseId).container(accountsContainerId);
    },
    getFixedCostsContainer: function() {
        return client.database(databaseId).container(fixedCostsContainerId);
    }
}
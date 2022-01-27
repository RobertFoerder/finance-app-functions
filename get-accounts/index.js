const validation = require('../shared/validationFunctions');
const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, req) {
    const { resources: results } = await cosmos.getAccountsContainer(context).items.readAll().fetchAll();

    const accounts = results.map(entry => mapping.mapToAccount(entry));

    return (context.res = {
        status: 200,
        body: accounts,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
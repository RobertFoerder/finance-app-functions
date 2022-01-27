const validation = require('../shared/validationFunctions');
const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, req) {
    if (!validation.validateAccount(context, req.body)) {
        return (context.res = {
            status: 400,
            body: 'invalid account'
        })
    }

    const { resource: cosmosDbItem } = await cosmos.getAccountsContainer(context).items.create(mapToCosmosDbEntry(req.body));
    
    return (context.res = {
        status: 201,
        body: mapping.mapToAccount(cosmosDbItem),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
    
function mapToCosmosDbEntry(account) {
    return {
        name: account.name,
        value: account.value
    };
}
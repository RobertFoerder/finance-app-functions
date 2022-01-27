const validation = require('../shared/validationFunctions');
const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, req) {
    const id = context.bindingData.id;

    const { resources: results } = await cosmos.getAccountsContainer(context).items
        .query(`select * from c where c.id = '${id}'`).fetchAll();

    if (results.length === 0) {
        return (context.res = {
            status: 404,
            body: 'item not found'
        });
    }

    if (!validation.validateAccount(context, req.body)) {
        return (context.res = {
            status: 400,
            body: 'invalid account'
        })
    }

    const { resource: cosmosDbItem } = await cosmos.getAccountsContainer(context)
    .item(id, results[0].name).replace(mapToCosmosDbEntry(id, results[0].name, req.body.value));
    
    return (context.res = {
        status: 200,
        body: mapping.mapToAccount(cosmosDbItem),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
    
function mapToCosmosDbEntry(id, name, value) {
    return {
        id,
        name,
        value
    };
}
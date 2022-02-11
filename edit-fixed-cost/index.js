const validation = require('../shared/validationFunctions');
const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, req) {
    const id = context.bindingData.id;

    const { resources: results } = await cosmos.getFixedCostsContainer(context).items
        .query(`select * from c where c.id = '${id}'`).fetchAll();

    if (results.length === 0) {
        return (context.res = {
            status: 404,
            body: 'item not found'
        });
    }

    if (!validation.validateFixedCost(context, req.body)) {
        return (context.res = {
            status: 400,
            body: 'invalid fixed cost'
        })
    }

    const { resource: cosmosDbItem } = await cosmos.getFixedCostsContainer(context)
    .item(id, results[0].id).replace(mapToCosmosDbEntry(id, req.body));
    
    return (context.res = {
        status: 200,
        body: mapping.mapToFixedCost(cosmosDbItem),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
    
function mapToCosmosDbEntry(id, fixedCost) {
    return {
        id,
        category: fixedCost.category,
        description: fixedCost.description,
        value: fixedCost.value
    };
}
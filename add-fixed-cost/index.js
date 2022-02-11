const validation = require('../shared/validationFunctions');
const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, req) {
    if (!validation.validateFixedCost(context, req.body)) {
        return (context.res = {
            status: 400,
            body: 'invalid fixed cost'
        })
    }

    const { resource: cosmosDbItem } = await cosmos.getFixedCostsContainer(context).items.create(mapToCosmosDbEntry(req.body));
    
    return (context.res = {
        status: 201,
        body: mapping.mapToFixedCost(cosmosDbItem),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
    
function mapToCosmosDbEntry(fixedCost) {
    return {
        category: fixedCost.category,
        description: fixedCost.description,
        value: fixedCost.value
    };
}
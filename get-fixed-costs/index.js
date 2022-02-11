const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, req) {
    const { resources: results } = await cosmos.getFixedCostsContainer(context).items.readAll().fetchAll();

    const fixedCosts = results.map(entry => mapping.mapToFixedCost(entry));

    return (context.res = {
        status: 200,
        body: fixedCosts,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const validation = require('../shared/validationFunctions');
const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, req) {
    if (!validation.validateFinanceEntry(context, req.body)) {
        return (context.res = {
            status: 400,
            body: 'invalid finance entry'
        })
    }

    const { resource: cosmosDbItem } = await cosmos.getContainer(context).items.create(mapToCosmosDbEntry(req.body));
    
    return (context.res = {
        status: 201,
        body: mapping.mapToFinanceEntry(cosmosDbItem),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
    
function mapToCosmosDbEntry(financeEntry) {
    return {
        year: financeEntry.year,
        month: financeEntry.month,
        category: financeEntry.category,
        description: financeEntry.description,
        value: financeEntry.value,
        date: financeEntry.date
    };
}
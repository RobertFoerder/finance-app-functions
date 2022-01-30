const validation = require('../shared/validationFunctions');
const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, req) {
    const id = context.bindingData.id;

    const { resources: results } = await cosmos.getFinanceEntriesContainer(context).items
        .query(`select * from c where c.id = '${id}'`).fetchAll();

    if (results.length === 0) {
        return (context.res = {
            status: 404,
            body: 'item not found'
        });
    }

    if (!validation.validateFinanceEntry(context, req.body)) {
        return (context.res = {
            status: 400,
            body: 'invalid finance entry'
        })
    }

    const { resource: cosmosDbItem } = await cosmos.getFinanceEntriesContainer(context)
    .item(id, results[0].year).replace(mapToCosmosDbEntry(id, results[0].year, req.body));
    
    return (context.res = {
        status: 200,
        body: mapping.mapToFinanceEntry(cosmosDbItem),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
    
function mapToCosmosDbEntry(id, year, financeEntry) {
    return {
        id,
        year,
        month: financeEntry.month,
        category: financeEntry.category,
        description: financeEntry.description,
        value: financeEntry.value,
        date: financeEntry.date
    };
}
const cosmos = require('../shared/cosmosFunctions');

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

    await cosmos.getFinanceEntriesContainer().item(id, results[0].year).delete();

    return (context.res = {
        status: 204
    });
}
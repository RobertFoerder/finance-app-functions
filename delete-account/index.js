const cosmos = require('../shared/cosmosFunctions');

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

    await cosmos.getAccountsContainer().item(id, results[0].name).delete();

    return (context.res = {
        status: 204
    });
}
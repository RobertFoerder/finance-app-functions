const validation = require('../shared/validationFunctions');
const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, req) {
    if (!validation.validateFinanceQueryParams(context, req.query)) {
        return (context.res = {
            status: 400,
            body: 'invalid query parameters'
        });
    }

    const queryString = buildQueryString(req.query.year, req.query.month, req.query.category);

    const { resources: results } = await cosmos.getFinanceEntriesContainer(context).items.query(queryString).fetchAll();

    const financeEntries = results.map(entry => mapping.mapToFinanceEntry(entry));

    return (context.res = {
        status: 200,
        body: financeEntries,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function buildQueryString(year, month, category) {
    var queryString = 'select * from c where';

    if (year) {
        queryString = queryString.concat(` c.year = ${year}`);
    }

    if (month) {
        if (year) {
            queryString = queryString.concat(' and');
        }
        queryString = queryString.concat(` c.month = ${month}`);
    }

    if(category) {
        if (year || month) {
            queryString =queryString.concat(' and');
        }
        queryString = queryString.concat(` c.category = ${category}`);
    }

    return queryString;
}
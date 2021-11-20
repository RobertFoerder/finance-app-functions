module.exports = async function (context, req) {
    if (!validateEntry(req.body)) {
        return (context.res = {
            status: 400,
            body: 'Invalid finance entry'
        })
    }

    addEntryToCosmosDb(context, req.body);

    return (context.res = {
        status: 201,
        body: req.body,
    });
}

function validateEntry(financeEntry) {
    if (!financeEntry) {
        return false;
    }

    if (!financeEntry.year || 
        !financeEntry.month || 
        !financeEntry.category || 
        !financeEntry.description || 
        !financeEntry.value) {
        return false;
    }

    return true;
}

function addEntryToCosmosDb(context, financeEntry) {
    context.bindings.cosmos = JSON.stringify({
        year: financeEntry.year,
        month: financeEntry.month,
        category: financeEntry.category,
        description: financeEntry.description,
        value: financeEntry.value
    });
}
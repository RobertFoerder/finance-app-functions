module.exports = async function (context, req) {
    if (!validateEntry(context, req.body)) {
        return (context.res = {
            status: 400,
            body: 'invalid finance entry'
        })
    }
    
    addEntryToCosmosDb(context, req.body);
    
    return (context.res = {
        status: 201,
        body: req.body,
    });
}

function validateEntry(context, financeEntry) {
    if (!financeEntry) {
        context.log('finance entry not set');
        return false;
    }
        
    if (!validateYear(context, financeEntry.year)) {
        return false;
    }

    if (!validateMonth(context, financeEntry.month)) {
        return false;
    }

    if (!financeEntry.category || isBlank(financeEntry.category)) {
        context.log('category not set');
        return false;
    }

    if (!financeEntry.description || isBlank(financeEntry.description)) {
        context.log('description not set');
        return false;
    }

    if (!financeEntry.value || !validateCurrencyValue(financeEntry.value)) {        
        context.log('invalid value');
        return false;
    }
        
    return true;
}
    
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function validateYear(context, year) {
    if (!year) {
        context.log('year not set');
    }

    if (!validateNumericValue(year)) {
        context.log('year is not a numeric value');
        return false;
    }
    
    var current_year = new Date().getFullYear();
    if((year < 1920) || (year > current_year))
    {
        context.log('year should be between 1920 and current year');
        return false;
    }
    
    return true;
}

function validateMonth(context, month) {
    if (!month) {
        context.log('month not set');
        return false;
    }

    if (!validateNumericValue(month)) {
        context.log('month is not a numeric value');
        return false;
    }

    if (month < 1 || month > 12) {
        context.log('month has to be between 1 and 12');
        return false;
    }

    return true;
}

function validateNumericValue(value) {
    var text = /^[0-9]+$/;
    
    if ((value != "") && (!text.test(value))) {
        return false;
    }

    return true;
}

function validateCurrencyValue(value) {
    var text  = /^(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;

    return text.test(value);
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
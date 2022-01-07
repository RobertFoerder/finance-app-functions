module.exports = {
    validateFinanceEntry: function(context, financeEntry) {
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
    },
    validateFinanceQueryParams: function(context, query) {
        if (!query.year && !query.month && !query.category) {
            context.log('no query parameters provided');
            return false;
        }
    
        if (query.year && !validateYear(context, query.year)) {
            return false;
        }
    
        if (query.month && !validateMonth(context, query.month)) {
            return false;
        }
    
        if (query.category && isBlank(query.category)) {
            context.log('invalid category');
            return false;
        }
    
        return true;
    }
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
    if (month == null || month == undefined) {
        context.log('month not set');
        return false;
    }

    if (!validateNumericValue(month)) {
        context.log('month is not a numeric value');
        return false;
    }

    if (month < 0 || month > 11) {
        context.log('month has to be between 0 and 11');
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
    var text = /^-?[1-9]\d*(\.\d{1,2})?$|^-?0+\.[1-9]\d?$|^-?0+\.\d[1-9]$/;
    return text.test(value);
}
module.exports = {
    mapToFinanceEntry: function(cosmosDbItem) {
        return {
            id: cosmosDbItem.id,
            year: cosmosDbItem.year,
            month: cosmosDbItem.month,
            category: cosmosDbItem.category,
            description: cosmosDbItem.description,
            value: cosmosDbItem.value,
            date: cosmosDbItem.date
        };
    }
}
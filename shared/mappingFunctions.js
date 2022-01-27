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
    },
    mapToAccount: function(cosmosDbItem) {
        return {
            id: cosmosDbItem.id,
            name: cosmosDbItem.name,
            value: cosmosDbItem.value
        }
    }
}
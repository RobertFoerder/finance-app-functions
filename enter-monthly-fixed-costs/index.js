const cosmos = require('../shared/cosmosFunctions');
const mapping = require('../shared/mappingFunctions');

module.exports = async function (context, myTimer) {
    const { resources: results } = await cosmos.getFixedCostsContainer(context).items.readAll().fetchAll();

    const fixedCosts = results.map(entry => mapping.mapToFixedCost(entry));

    fixedCosts.forEach((fixedCost) => {
        const financeEntry = createFinanceEntry(fixedCost);
        await cosmos.getFinanceEntriesContainer(context).items.create(financeEntry);
    });
};

function createFinanceEntry(fixedCost) {
    const date = new Date();

    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        category: fixedCost.category,
        description: fixedCost.description,
        value: fixedCost.value,
        date: fixedCost.date
    };
}
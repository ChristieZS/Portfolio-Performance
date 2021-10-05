const prices = [
    { effectiveDate: new Date(2021, 8, 1, 5, 0, 0), price: 35464.53 },
    { effectiveDate: new Date(2021, 8, 2, 5, 0, 0), price: 35658.76 },
    { effectiveDate: new Date(2021, 8, 3, 5, 0, 0), price: 36080.06 },
    { effectiveDate: new Date(2021, 8, 3, 13, 0, 0), price: 37111.11 },
    { effectiveDate: new Date(2021, 8, 6, 5, 0, 0), price: 38041.47 },
    { effectiveDate: new Date(2021, 8, 7, 5, 0, 0), price: 34029.61 },
];

const transactions = [
    { effectiveDate: new Date(2021, 8, 1, 9, 0, 0), value: 0.012 },
    { effectiveDate: new Date(2021, 8, 1, 15, 0, 0), value: -0.007 },
    { effectiveDate: new Date(2021, 8, 4, 9, 0, 0), value: 0.017 },
    { effectiveDate: new Date(2021, 8, 5, 9, 0, 0), value: -0.01 },
    { effectiveDate: new Date(2021, 8, 7, 9, 0, 0), value: 0.1 },
];

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

//Rolls back date until a value is found from the given map
function getVal(map, date) {
    let val = map.get(date.toISOString())
    const newDate = new Date(date)
    while(!val){
        newDate.setDate(newDate.getDate() - 1)
        val = map.get(newDate.toISOString())
    }

    return val
}

export function getDailyPortfolioValues() {
    //I use this to get around BST time
    //All dates are derived from these so will be consistently UTC
    const startDate = createDateAsUTC(new Date(2021, 8, 1, 0, 0, 0));
    const endDate = createDateAsUTC(new Date(2021, 8, 8, 0, 0, 0));

    //Group prices by whole date (no time, latest price of day)
    //Groups in a Map so that I can access the value for a specific day easily later on
    const pricesMap = new Map;
    for(var i = 0; i < prices.length; i++) {
        const date = prices[i].effectiveDate;
        date.setUTCHours(0, 0, 0, 0)
        pricesMap.set(date.toISOString(), prices[i].price)
    }

    //Group transactions by whole date (no time, up to date value of day)
    const transactionMap = new Map();
    let transactionSum = 0
    for(let i = 0; i < transactions.length; i++) {
        const date = transactions[i].effectiveDate;
        date.setUTCHours(0, 0, 0, 0)

        transactionSum += transactions[i].value

        if(transactionMap.get(date.toISOString()) === undefined) {
            transactionMap.set(date.toISOString(), transactionSum)
        }
        else { 
            transactionMap.set(date.toISOString(),  transactionMap.get(date.toISOString()) + transactions[i].value)
        }
    }

    const portfolio = []
    while(startDate < endDate){        
        const value = getVal(transactionMap, startDate) * getVal(pricesMap, startDate)
        portfolio.push({effectiveDate: new Date(startDate), value: parseFloat(value.toFixed(5))})
        startDate.setUTCDate(startDate.getUTCDate() + 1)
    }

    return portfolio
}


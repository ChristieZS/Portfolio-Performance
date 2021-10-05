import { getDailyPortfolioValues } from "../src/PortfolioPerformance";

test("output is correct", () => {
    expect(getDailyPortfolioValues()).toEqual([
        { effectiveDate: new Date(2021, 8, 1, 1), value: 177.32265 },
        { effectiveDate: new Date(2021, 8, 2, 1), value: 178.2938 },
        { effectiveDate: new Date(2021, 8, 3, 1), value: 185.55555 },
        { effectiveDate: new Date(2021, 8, 4, 1), value: 816.44442 },
        { effectiveDate: new Date(2021, 8, 5, 1), value: 445.33332 },
        { effectiveDate: new Date(2021, 8, 6, 1), value: 456.49764 },
        { effectiveDate: new Date(2021, 8, 7, 1), value: 3811.31632 },
    ]);
});
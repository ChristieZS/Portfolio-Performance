# Bitcoin challenge

* Nucleus has a requirement to report on the portfolio performance of our clients’ bitcoin investments.
* Skeleton implementations have been provided in Java and JavaScript.
* Choose one of the two languages, implement `getDailyPortfolioValues` and get the unit test passing.
* In the `PortfolioPerformance` file, a list of bitcoin prices and a list of transactions are provided.
* Both lists are sorted by date in ascending order.
* At the beginning of the reporting period, assume that the client has 0 bitcoins.
* The reporting period is 01-09-2021 to 07-09-2021.
* For each day in the reporting period, output the date and the portfolio value.
* This should be output in ascending order by date.
* Portfolio value = number of units held at the end of the given day * most recent fund price for the given day.

# System requirements

## Java
* Java 16 or newer
* junit-jupiter 5.8.1
* There is a maven `pom.xml` included in the `java` directory that can be used to build the project. If you're not familiar with maven, you can copy and paste the `.java` files into your IDE of choice and run the unit test manually.

## JavaScript
* node 14
* Run `npm install` from the `javascript` directory

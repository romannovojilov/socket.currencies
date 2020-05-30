const http = require('./http');
const currenciesRepository = require('../db/currenciesRepository');
const BankiParser = require('./bankiParser');

(async function () {
    try {
        const source = await http.request('https://www.banki.ru/products/currency/cb/');
        const bankiParser = new BankiParser(
            source,
            currenciesRepository
        );
        await bankiParser.run();
    } catch (err) {
        console.error(err);
    }
})();







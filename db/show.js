const currenciesRepository = require('./currenciesRepository');

(async function() {
    const data = await currenciesRepository.select();
    console.log(data);
})();
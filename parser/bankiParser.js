
const getDateNow = require('../helper').getDateNow;
const Parser = require('./parser');
const cheerio = require('cheerio');

module.exports = class extends Parser {

    parse(source) {
        const $ = cheerio.load(source, { decodeEntities: false });
        const items = [];
        const date = $('*[data-bind="date-name"]').eq(0).text().split('.');
        const actualDate = new Date(
            parseInt(date[2]),
            parseInt(date[1]) - 1,
            parseInt(date[0])).getTime()
        || getDateNow();
        $('.standard-table tr:not([data-widget-row])').each(function(i, el) {
            if(!i) return;
            const row = $(el).find('td');
            const data = {
                code: row.eq(0).text().trim(),
                units: parseInt(row.eq(1).text()) || 0,
                currency: row.eq(2).text().trim(),
                course: parseFloat(row.eq(3).text()) || 0,
                diff: parseFloat(row.eq(4).text().replace(',', '.')) || 0,
                actualDate
            }
            items.push(data);
        });
        return items;
    }

    afterInsert(item) {
        console.log(JSON.stringify(item));
    }
}
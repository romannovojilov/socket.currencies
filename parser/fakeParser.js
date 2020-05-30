const { getRandom } = require('../helper');
const Parser = require('./parser');

module.exports = class extends Parser {
    constructor(repository) {
        super('fake', repository);
    }

    async parse(source) {
        return this.repository.limit(getRandom(5));
    }
}
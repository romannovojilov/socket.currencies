const { EventEmitter } = require('events');

module.exports = class {
    constructor(source, repository) {
        this.source = source;
        this.repository = repository;
        this.emitter = new EventEmitter();
    }

    async run() {
        const parsedData = await this.parse(this.source);
        const fullData = [];
        for (const item of parsedData) {
            try {
                if (this.beforeInsert(item)) {
                    const newItem = await this.repository.insert(item);
                    fullData.push(newItem);
                    this.emitter.emit('insert', newItem);
                    this.afterInsert(newItem);
                }
            } catch (err) {
                throw err;
            }
        }
        return fullData;
    }

    /**
     * @abstract
     * @param {Cheerio} $
     * @returns {Promise<Array>}
     */
    async parse($) {
        return Promise.resolve([]);
    }

    /**
     * @abstract
     * @param {*} item
     * @returns {Boolean} 
     */
    beforeInsert(item) {
        return true;
    }

    /**
     * @abstract
     * @param {*} item 
     */
    afterInsert(item) { }

    addInsertListener(fn) {
        this.emitter.addListener('insert', fn);
    }

    removeInsertListener(fn) {
        this.emitter.removeListener('insert', fn);
    }
}
module.exports = {
    getDateNow() {
        let dt = new Date();
        return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0).getTime();
    },
    getRandom(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }
}
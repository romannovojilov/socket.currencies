const express = require('express');
const http = require('http');
const path = require('path');
const FakeParser = require('./parser/fakeParser');
const { getRandom } = require('./helper');
const currenciesRepository = require('./db/currenciesRepository');

const initializeSocket = require('./socket');

const fakeParser = new FakeParser(currenciesRepository);
fakeParser.addInsertListener(item => console.log(item));

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'client')));


app.get('/select', async (req, res) => {
    res.header('Content-Type', 'application/json');
    res.json(await fakeParser.repository.select());
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});
server.listen(3000);


const emitUpdate = (time = 3000) => {
    setTimeout(async () => {
        try {
            await fakeParser.run();
        } catch(err) {
            console.error(err);
        }
        emitUpdate(getRandom(10000));
    }, time);
};
emitUpdate();

initializeSocket(server, fakeParser);
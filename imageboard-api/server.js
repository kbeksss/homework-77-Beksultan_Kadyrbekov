const express = require('express');
const cors = require('cors');

const fileDb = require('./fileDb');

const app = express();

const imageBoarder = require('./app/imageboarder');
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/board', imageBoarder);

const run = async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log('Server started on port: ', port);
    });
};

run().catch(e => console.error(e));


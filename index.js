import express from 'express';
import * as PathModule from 'path';
import * as FileModule from 'fs/promises';


// http://expressjs.com/en/5x/api.html#express.json
const app = express()
// Problematic: when the json parse fails, it throws an internal error
app.use(express.json({ type() { return true; }}))

const DATA_FILE_PATH = PathModule.join(new URL(import.meta.url).pathname, '..', 'data.json')

const data = {};

async function readFromFile() {
    try {
        let content = await FileModule.readFile(DATA_FILE_PATH);
        content = JSON.parse(content);
        Object.assign(data, content);
        console.log('Successfully loaded data from file.')
    } catch (error) {
        console.error('Error when trying to load from file:')
        console.error(error);
        console.error('Using empty data instead.');
    }
}

async function saveToFile() {
    await FileModule.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 4), { flag: 'w+' });
}
setInterval(saveToFile, 5 * 1000);

function startServer() {
    const PORT = 3000;
    const HOSTNAME = '0.0.0.0';
    app.listen(PORT, HOSTNAME, () => {
        console.log(`Example app listening at http://${HOSTNAME}:${PORT}`)
    });
}

readFromFile().then(() => {
    startServer();
})


app.get('/', (req, res) => {
    res.status(200).end('OK');
})

app.get('/vibration/new', (req, res) => {
    const newUserId = UUIDv4();
    data[newUserId] = {};
    console.debug('New user created with id: ' + newUserId);
    res.status(200).json({ userID: newUserId });
})

app.post('/vibration/answer', (req, res) => {
    const { userID, questionID, answerContent } = req.body;
    if (!(userID in data)) {
        return res.status(400).json({ message: 'User id was not found: ' + userID });
    }

    data[userID][questionID] = { timestamp: new Date(), answerContent };

    res.status(200).end();
})

app.post('/vibration/pre-q', (req, res) => {
    const { userID, answerContent } = req.body;
    if (!(userID in data)) {
        return res.status(400).json({ message: 'User id was not found: ' + userID });
    }

    data[userID]['pre'] = { timestamp: new Date(), answerContent };

    res.status(200).end();
})

app.post('/vibration/post-q', (req, res) => {
    const { userID, answerContent } = req.body;
    if (!(userID in data)) {
        return res.status(400).json({ message: 'User id was not found: ' + userID });
    }

    data[userID]['post'] = { timestamp: new Date(), answerContent };

    res.status(200).end();
})

function UUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {
    title
} = require('process');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Webová anketa!'
    });
});

app.get('/anketa', (req, res) => {
    res.render('anketa', {
        title: 'Anketa o hrách'
    });
});

app.get("/results", (req, res) => {
    fs.readFile('responses.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Nastala chyba při čtení dat.');
        }
        const responses = JSON.parse(data);
        res.render('results', {
            title: "Výsledky ankety",
            responses
        });
    });
});

app.listen(PORT, () => {
    console.log('Server běží na portu ' + PORT);
});
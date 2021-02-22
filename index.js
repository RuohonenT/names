const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/data', (req, res) => {
    res.sendFile(path.normalize(__dirname + '/data/names.json'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.post('/send/', (req, res, next) => {

    const user = {
        name: req.body.name,
    }
    students = students.concat(student);
    res.json(student);
    next();
})


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on ${port}`);
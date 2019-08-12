const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json({limit: '150mb'}));

let curJSON = null;

app.get('/getJSON', function (req, res) {
    if (curJSON === null) {
        res.json({"result": "null"});
    }
    res.json(curJSON);
});

app.post('/setJSON', function(req, res) {
    curJSON = req.body;
    res.end(JSON.stringify(curJSON));
});

app.delete('/deleteJSON', function (req, res) {
   curJSON = null;
   res.json({"result": "OK"})
});

const server = app.listen(8081, function () {

});

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);

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

io.on('connection', function(socket) {
    console.log('A client connected');
    socket.join('main');
    console.log('client joined main room');

    socket.on('setJSON', function(data) {
        curJSON = JSON.parse(data);
    });
    socket.on('getJSON', function() {
        socket.emit('JSONretrieved', curJSON);
    });
    socket.on('update-value', (data) => {
        curJSON = JSON.parse(data);
        console.log(curJSON);
        io.sockets.emit('done-updating', data);
    });
});

server.listen(8081, () => {

});

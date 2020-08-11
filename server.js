const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const server = require('http').Server(app);

app.use(cors());

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.listen(process.env.PORT || 8080, () => console.log(`Example app listening on port 8080!`));


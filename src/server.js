const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const partyfy = require('partyfy');

const Busboy = require('busboy');

const app = express();

app.use(
  helmet(),
  cors(),
  morgan(
    ':date[iso] :method :url :status :res[content-length] - :response-time ms'
  )
);

app.post('/partyfy', (req, res) => {
  const busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function(fieldName, file, fileName, encoding, mimetype) {
    const chunks = [];

    file.on('data', data => chunks.push(data));

    file.on('end', async () => {
      try {
        const image = Buffer.concat(chunks);
        const partyImage = await partyfy(image);
        res
          .status(200)
          .contentType('gif')
          .send(partyImage);
      } catch (err) {
        console.error(err);
        res.status(500).send('something went wrong');
      }
    });
  });

  busboy.on('error', error => {
    console.error(err);
    res.status(500).send('something went wrong');
  });

  req.pipe(busboy);
});

app.get('/ping', (req, res) => res.status(200).json('pong'));

module.exports = app;

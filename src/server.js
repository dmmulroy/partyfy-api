const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const partyfy = require('partyfy');

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.use(
  helmet(),
  cors(),
  morgan(
    ':date[iso] :method :url :status :res[content-length] - :response-time ms'
  )
);

app.post('/partyfy', upload.single('image'), async (req, res) => {
  try {
    const partyImage = await partyfy(req.file.buffer);

    res
      .contentType('gif')
      .status(200)
      .send(partyImage);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/ping', (req, res) => res.status(200).json('pong'));

module.exports = app;

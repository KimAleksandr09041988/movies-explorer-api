const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, BIT_FILM_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();
mongoose.connect(BIT_FILM_DB);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

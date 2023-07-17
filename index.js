// include express
const express = require('express');
// include mongoose
const mongoose = require('mongoose');

// PORT
const { PORT=3000 } = process.env;

// Create server
const app = express();

// Connect to mongo server
mongoose.connect('mongodb://localhost:27017/bitfilmsdb',  {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// listen port
app.listen(PORT, () => {
  console.log(`Listening port - ${PORT}`);
})
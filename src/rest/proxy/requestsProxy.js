// const express = require('express');
// const request = require('request');

import express from 'express';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get((req, res) => {
  res.send('Successful request!');
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

//TODO delete this file and proxy folder if not needed at the end
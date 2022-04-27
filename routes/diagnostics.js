const diagnostics = require('express').Router();
const { v4: uuidv4, v4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const path = require('path');
const { read } = require('fs');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then(data => {
    res.json(JSON.parse(data));
  });
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { isValid, errors } = req.body;

  const errObject = {
    time: Date.now(),
    error_id: uuidv4(),
    errors,
  }

  if (!isValid) {
    readAndAppend(errObject, './db/diagnostics.json')
    res.send(errObject);
  } else {
    res.send({
      message: 'Object is vald',
      error_id: errObject.error_id
    }
    )
  }
});

module.exports = diagnostics;

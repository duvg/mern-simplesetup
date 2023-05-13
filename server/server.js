import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
// comment out before production
import devBundle from './devBundle';

import template from './../template';

const app = express();
// comment out before production
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();


app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
  res.status(200).send(template());
});

let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.log('Server started on port %s', port);
});

const url = process.env.MONGO_URI || 'mongodb://localhost:27017/mernSimpleSetup';
MongoClient.connect(url, (err, db) => {
  console.log('Connected succesfully to mongodb server');
  db.close();
});
// equivalent of older: const express = require('express')

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const app = express();

app.use( express.static( "public" ) );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cors( { origin: true, credentials: true } ) );

const stripe =require("stripe")

// Allow any method from any host and log requests
app.use((req: { method: string; ip: any; url: any; }, res: { header: ( arg0: string, arg1: string ) => void; sendStatus: ( arg0: number ) => void; }, next: () => void) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
} );

// Handle POST requests that come in formatted as JSON
app.use( express.json() );

// A default hello word route
app.get('/', (req: any, res: { send: ( arg0: { hello: string; } ) => void; }) => {
  res.send({ hello: 'world' });
} );

// start our server on port 4201
app.listen(4201, '127.0.0.1', function () {
  console.log('Server now listening on 4201');
});

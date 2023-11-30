// equivalent of older: const express = require('express')

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const app = express();

app.use( express.static( "public" ) );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cors( { origin: true, credentials: true } ) );

const stripe = require( "stripe" )( "sk_test_51OFwcvKlrjsqeXTeimTQENmzKmQbPhT5SpZHQOsHuJKcqoQeFLn1zCTsiIzSoD4DLTjLzcJ47AIe2MYXsf8mHILi002hpSs7kz" );

app.post( "/checkout", async ( req, res, next ) => {
  try {
    const session = await stripe.checkout.sessions.create( {
      line_items: req.body.items.map( ( item ) => ( {
        currency: "euro",
        product_data: {
          name: item.name,
          images: [item.product]
        },
        unit_amount: item.price *100
      } ) ),
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    } )
  }catch ( error ) {
  next(error)
  }
})

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

// start our server on port 4242
app.listen(4242, function () {
  console.log('Server now listening on 4201');
});

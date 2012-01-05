var express = require( 'express' );
var mongoose = require( 'mongoose' );

var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGOLAB_URI;

var contactsCollection = null;

var contacts = {
    add: function( firstName, lastName, requestCallback )
    {
        addToDatabase( firstName, lastName, requestCallback );
    }
};

mongo.connect( mongouri, {}, dbConnectCallback );

express.createServer(

    require( 'connect-jsonrpc' )( contacts )
).listen( port );

function dbConnectCallback( error, db )
{
    db.addListener( "error", handleError );
    db.createCollection( "contacts", createCollectionCallback );
};

function handleError( error )
{
    console.log( "Error connecting to MongoLab" );
};

function createCollectionCallback( error, collection )
{
    db.collection( "contacts", collectionCallback )
};

function collectionCallback( error, collection )
{
    contactsCollection = collection;
};

function insertCallback( error, result )
{
    res.write( JSON.stringify( result ) );
};

function addToDatabase( firstName, lastName, requestCallback )
{
    console.log( "***** addToDatabase *****" );

    if ( contactsCollection != null )
        contactsCollection.insert( firstName, function(error, result) {

            requestCallback( null, result );
        });
};

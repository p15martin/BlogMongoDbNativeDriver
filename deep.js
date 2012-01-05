var connect = require( 'connect' );
var mongo = require( 'mongodb' );

var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGOLAB_URI;

var contactsCollection = null;

var contacts = {
    add: function( firstName, lastName, requestCallback )
    {
        addToDatabase( firstName, lastName, requestCallback );
    }
};

connect.createServer(

    require( 'connect-jsonrpc' )( contacts )
).listen( port );

mongo.connect( mongoUri, {}, function ( error, db )
{
    database.addListener( "error", function handleError( error )
    {
        console.log( "Error connecting to MongoLab" );
    });

    database.createCollection( "contacts", function ( error, collection )
    {
        db.collection( "contacts", function ( error, collection ) {
            contactsCollection = collection;
        });
    });
});

function addToDatabase( firstName, lastName, requestCallback )
{
    if ( contactsCollection != null )
        contactsCollection.insert( { "firstName": firstName, "lastName": lastName }, function(error, result)
        {
            requestCallback( null, "success" );
        });
};

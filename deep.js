var connect = require( 'connect' );
var mongo = require( 'mongodb' );

var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGOLAB_URI;
var db = mongo.db( mongoUri );

//var contactsCollection = null;

var contacts = {
    add: function( firstName, lastName, requestCallback )
    {
        db.collection( "contacts" ).insert( { "firstName": firstName, "lastName": lastName }, function(error, result)
        {
            requestCallback( null, "success" );
        });
        /*
        if ( contactsCollection != null )
        {
            contactsCollection.insert( { "firstName": firstName, "lastName": lastName }, function(error, result)
            {
                requestCallback( null, "success" );
            });
        }
        */
    }
};

connect.createServer(

    require( 'connect-jsonrpc' )( contacts )
).listen( port );

/*
mongo.connect( mongoUri, {}, function ( error, db )
{
    db.addListener( "error", function handleError( error )
    {
        console.log( "Error connecting to MongoLab" );
    });

    db.createCollection( "contacts", function ( error, collection )
    {
        db.collection( "contacts", function ( error, collection )
        {
            contactsCollection = collection;
        });
    });
});
*/

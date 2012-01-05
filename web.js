var connect = require( 'connect' );
var mongo = require( 'mongodb' );

// Connect to a mongo database via URI
// With the MongoLab addon the MONGOLAB_URI config variable is added to your
// Heroku environment.  It can be accessed as process.env.MONGOLAB_URI
mongo.connect( process.env.MONGOLAB_URI, {}, dbConnectCallback );

function dbConnectCallback( error, db ) {

    db.addListener( "error", handleError );
    db.createCollection( "requests", creatCollectionCallback );
};

function handleError( error ) {

    console.log("Error connecting to MongoLab");

};

function createCollectionCallback( error, collection ) {

    db.collection( "requests", collectionCallback )
};

function collectionCallback( error, collection ) {

    var requestCollection = collection;

    connect(
        connect.favicon(),                    // Return generic favicon
        connect.query(),                      // populate req.query with query parameters
        connect.bodyParser(),                 // Get JSON data from body
        handleRequest ).listen(process.env.PORT || 8080);
};

function handlerRequest( req, res, next ) {

    res.setHeader("Content-Type", "application/json");

    if ( req.query != null ) {
        requestCollection.insert( req.query, insertCallback );
    }

    res.end();
};

function insertCallback( error, result ) {
    
    res.write( JSON.stringify( result ) );
};
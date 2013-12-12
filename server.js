/**
 * Module dependencies.
 */

var express = require('express');
var url = require("url");
var swagger = require("swagger-node-express");
var http = require('http');
//var petResources = require("./petResources.js");

var app = express();
app.use(express.bodyParser());

// Set Swagger App Handler
swagger.setAppHandler(app);

// Add API Key Access
swagger.addValidator(
  function validate(req, path, httpMethod) {
    //  example, only allow POST for api_key="special-key"
    if ("POST" == httpMethod || "DELETE" == httpMethod || "PUT" == httpMethod ) {
  
      var apiKey = req.headers["api_key"];
      if (!apiKey) {
        apiKey = url.parse(req.url,true).query["api_key"]; }
      if ("bee" == apiKey) {
        return true; 
      }
      return false;
    }
    return true;
  }
);  

// Add models and methods to swagger
var models = require("./models/album.js");
var album = require('./routes/album');
swagger.addModels(models)
      .addGet(album.listAllAlbum)
      .addGet(album.listAllAlbumWithArtistName)
      .addGet(album.findAlbumByAlbumId)
      .addGet(album.findAlbumByArtistId)
      .addPost(album.addAlbum)
      .addPut(album.updateAlbum)
      .addDelete(album.deleteAlbum);



// Configures the app's base path and api version.
swagger.configure("http://localhost:3302", "0.1");

// Serve up swagger ui at /docs via static route
var docs_handler = express.static(__dirname + '/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location' : req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});

// Start the server
app.set('port', process.env.PORT || 3302);
app.use(app.router);


// routes
// app.get('/albums', album.listAllAlbum);
// app.get('/albumsWithArtistName', album.listAllAlbumWithArtistName);
// app.get('/updateAlbum', album.updateAlbum);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
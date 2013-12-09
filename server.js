/**
 * Module dependencies.
 */

var express = require('express');
var url = require("url");
var swagger = require("swagger-node-express");

//var album = require('./routes/album');

var http = require('http');

var petResources = require("./petResources.js");

var app = express();

app.use(express.bodyParser());
swagger.setAppHandler(app);

/*swagger.addValidator(
  function validate(req, path, httpMethod) {
    console.log("api_key : " + req.headers["api_key"]);
    //  example, only allow POST for api_key="special-key"
    if ("POST" == httpMethod || "DELETE" == httpMethod || "PUT" == httpMethod || "GET" == httpMethod) {
  
      var apiKey = req.headers["api_key"];
      if (!apiKey) {
        apiKey = url.parse(req.url,true).query["api_key"]; }
      if ("special-key" == apiKey) {
        return true; 
      }
      return false;
    }
    return true;
  }
);	*/



var models = require("./models.js");

// Add models and methods to swagger
swagger.addModels(models)
  .addGet(petResources.findByTags)
  .addGet(petResources.findByStatus)
  .addGet(petResources.findById)
  .addPost(petResources.addPet)
  .addPut(petResources.updatePet)
  .addDelete(petResources.deletePet);

// Configures the app's base path and api version.
swagger.configure("http://localhost:8002", "0.1");


// Serve up swagger ui at /docs via static route
var docs_handler = express.static(__dirname + '/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  console.log(req.url);
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location' : req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});

// Start the server on port 8002
app.listen(8002);

/*

// all environments
app.set('port', process.env.PORT || 3302);
app.use(app.router);


// routes
app.get('/albums', album.listAllAlbum);
app.get('/albumsWithArtistName', album.listAllAlbumWithArtistName);
app.get('/updateAlbum', album.updateAlbum);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/
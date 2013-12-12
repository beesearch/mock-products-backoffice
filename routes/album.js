var sqlite3 = require("sqlite3").verbose();
var https = require('https');
var sw = require("swagger-node-express");
var param = require("../node_modules/swagger-node-express/Common/node/paramTypes.js");
var url = require("url");
var swe = sw.errors;

//var petData = require("../petData.js");

function writeResponse (res, data) {
	sw.setHeaders(res);
  res.send(JSON.stringify(data));
}

exports.listAllAlbum = {
  'spec': {
    "description" : "Operations about albums",
    "path" : "/album/listAllAlbum",
    "notes" : "Returns all albums with artistId",
    "summary" : "List all albums",
    "method": "GET",
    "nickname" : "listAllAlbum"
  },
  'action': function (req,res) {
   	var sqlite3 = require('sqlite3').verbose();
   	var db = new sqlite3.Database('db/products.db');
   	var album = []

   	console.log("--> listAllAlbum");
   	db.all("SELECT AlbumId, Title, ArtistId FROM album", function(err, rows) {
   		rows.forEach(function (row) {
   			album.push([{	
   				id: row.AlbumId, 
   				title: row.Title, 
   				artistId: row.ArtistId
   			}]);
   		});

  		if(album) res.send(JSON.stringify(album));
  		else throw swe.notFound('album');
   		
   		db.close();
   	}); 
  }
};

exports.listAllAlbumWithArtistName = {
  'spec': {
    "description" : "Operations about albums",
    "path" : "/album/listAllAlbumWithArtistName",
    "notes" : "Returns all albums with artist name",
    "summary" : "List all albums",
    "method": "GET",
    "nickname" : "listAllAlbumWithArtistName"
  },
  'action': function (req,res) {
   	var sqlite3 = require('sqlite3').verbose();
   	var db = new sqlite3.Database('db/products.db');
   	var album = []

   	console.log("--> listAllAlbumWithArtistName");
   	db.all(" SELECT AlbumId, Title, Name FROM Album, Artist where Album.ArtistId = Artist.ArtistId", function(err, rows) {
   		rows.forEach(function (row) {
   			album.push([{
   				id: row.AlbumId, 
   				title: row.Title, 
   				artist: row.Name
   			}]);
   		});

  		if(album) res.send(JSON.stringify(album));
  		else throw swe.notFound('album');

   		db.close();
   	});
  }
};

exports.findAlbumByAlbumId = {
  'spec': {
    "description" : "Operations about albums",
    "path" : "/album/findAlbumByAlbumId/{albumId}",
    "notes" : "Returns album",
    "summary" : "Find album by AlbumId",
    "method": "GET",
    "params" : [param.path("albumId", "ID of album that needs to be fetched", "string")],
    "nickname" : "findAlbumByAlbumId"
  },
  'action': function (req,res) {
   	var sqlite3 = require('sqlite3').verbose();
   	var db = new sqlite3.Database('db/products.db');
   	var album = []

    var albumId = parseInt(req.params.albumId);

   	console.log("--> findAlbumByAlbumId : " + albumId);
   	db.all("SELECT AlbumId, Title, ArtistId FROM album WHERE AlbumId = " + albumId, function(err, rows) {
   		rows.forEach(function (row) {
   			album.push([{	
   				id: row.AlbumId, 
   				title: row.Title, 
   				artistId: row.ArtistId
   			}]);
   		});

  		if(album) res.send(JSON.stringify(album));
  		else throw swe.notFound('album');
   		
   		db.close();
   	}); 
  }
};

exports.findAlbumByArtistId = {
  'spec': {
    "description" : "Operations about albums",
    "path" : "/album/findAlbumByArtistId/{artistId}",
    "notes" : "Returns album",
    "summary" : "Find album by ArtistId",
    "method": "GET",
    "params" : [param.path("artistId", "ID of artist that needs to be fetched", "string")],
    "nickname" : "findAlbumByArtistId"
  },
  'action': function (req,res) {
   	var sqlite3 = require('sqlite3').verbose();
   	var db = new sqlite3.Database('db/products.db');
   	var album = []

      var artistId = parseInt(req.params.artistId);

   	console.log("--> findAlbumByArtistId : " + artistId);
   	db.all("SELECT AlbumId, Title, ArtistId FROM album WHERE ArtistId = " + artistId, function(err, rows) {
   		rows.forEach(function (row) {
   			album.push([{	
   				id: row.AlbumId, 
   				title: row.Title, 
   				artistId: row.ArtistId
   			}]);
   		});

  		if(album) res.send(JSON.stringify(album));
   		
   		db.close();
   	}); 
  }
};

exports.addAlbum = {
  'spec': {
    "description" : "Operations about albums",
    "path" : "/album",
    "notes" : "Add album to the store",
    "summary" : "Add album to the store",
    "method": "POST",
    "params" : [param.body("Album", "Album object that needs to be added to the store", "Album")],
    "nickname" : "addAlbum"
  },
  'action': function (req,res) {
   	var sqlite3 = require('sqlite3').verbose();
   	var db = new sqlite3.Database('db/products.db');

    var body = req.body;

   	console.log("--> addAlbum : " + JSON.stringify(body));

    var stmt = db.prepare("INSERT INTO Album (AlbumId, Title, ArtistId) VALUES (?, ?, ?)", function(err, rows) {
      stmt.run(body.id, body.title, body.artistId);
      stmt.finalize();
      res.send(JSON.stringify(body));
   	}); 

    db.close();
  }
};

exports.updateAlbum = {
  'spec': {
    "description" : "Operations about albums",
    "path" : "/album",
    "notes" : "Udate album to the store",
    "summary" : "Udate album to the store",
    "method": "PUT",
    "params" : [param.body("Album", "Album object that needs to be added to the store", "Album")],
    "nickname" : "updateAlbum"
  },
  'action': function (req,res) {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('db/products.db');

    var body = req.body;

    console.log("--> updateAlbum : " + JSON.stringify(body));

    var stmt = db.prepare("UPDATE Album SET AlbumId = ?, Title = ?, ArtistId = ? WHERE AlbumId = ?", function(err, rows) {
      stmt.run(body.id, body.title, body.artistId, body.id);
      stmt.finalize();
      res.send(JSON.stringify(body));
    }); 

    db.close();
  }
};


exports.deleteAlbum = {
  'spec': {
    "description" : "Operations about albums",
    "path" : "/album/{albumId}",
    "notes" : "Remove album to the store",
    "summary" : "Remove album to the store",
    "method": "DELETE",
    "params" : [param.path("albumId", "ID of album that needs to be remove", "string")],
    "nickname" : "deleteAlbum"
  },
  'action': function (req,res) {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('db/products.db');
    var album = []

    var albumId = parseInt(req.params.albumId);

    console.log("--> deleteAlbum : " + albumId);

    var stmt = db.prepare("DELETE FROM Album WHERE AlbumId = ?", function(err, rows) {
      stmt.run(albumId);
      stmt.finalize();
      res.send(album);
    }); 

    db.close();
  }
};

/*exports.updateAlbum = function(req, res){
 	var sqlite3 = require('sqlite3').verbose();
 	var db = new sqlite3.Database('db/products.db');
 	var album = []
	var options = {}
 	console.log("update all album");
 	db.all(" SELECT AlbumId, Title, Name FROM Album, Artist where Album.ArtistId = Artist.ArtistId AND Album.ArtistId = 1", function(err, rows) {
 		rows.forEach(function (row) {
 			console.log("---> Title : " + row.Title);
 			console.log("---> Artist : " + row.Name);

			https.request('https://itunes.apple.com/search?term=' + row.Title, function(res) {

			    var data = '';
				res.setEncoding('utf8');
			    res.on('data', function (chunk){
			        data += chunk;
			    });

			    res.on('end',function(){
			        var obj = JSON.parse(data);
			        console.log("<--- Title : " + obj.results[0].collectionName );
					console.log("<--- Artist : " + obj.results[0].artistName );
					console.log("<- url1 : " + obj.results[0].previewUrl );
					console.log("<- url2 : " + obj.results[0].artworkUrl60 );
					console.log("<- url3 : " + obj.results[0].artworkUrl100 );						
			    })
				
			}).end();
			
 		});
		
 		res.send(album);

 		db.close();
 	});
 };*/
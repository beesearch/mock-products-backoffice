var sqlite3 = require("sqlite3").verbose();
var https = require('https');
var sw = require("swagger-node-express");
var param = require("../node_modules/swagger-node-express/Common/node/paramTypes.js");
var swe = sw.errors;

function writeResponse (res, data) {
	sw.setHeaders(res);
	res.send(JSON.stringify(data));
}

exports.listAllTrack = {
	'spec': {
		"description" : "Operations about tracks",
		"path" : "/track/listAllTrack",
		"notes" : "Returns all tracks",
		"summary" : "List all tracks",
		"method": "GET",
		"nickname" : "listAllTrack"
	},
	'action': function (req,res) {
		var sqlite3 = require('sqlite3').verbose();
		var db = new sqlite3.Database('db/products.db');
		var track = []

		console.log("--> listAllTrack");
		db.all("SELECT TrackId, Name, AlbumId FROM track", function(err, rows) {
			rows.forEach(function (row) {
				track.push({	
					id: row.TrackId, 
					name: row.Name,
					albumId: row.AlbumId
				});
			});

			if(track) res.send(JSON.stringify(track));
			else throw swe.notFound('track');
			
			db.close();
		}); 
	}
};

exports.findTrackByAlbumId = {
	'spec': {
		"description" : "Operations about tracks",
		"path" : "/track/findTrackByAlbumId/{albumId}",
		"notes" : "Returns all tracks",
		"summary" : "List all tracks",
		"method": "GET",
		"params" : [param.path("albumId", "ID of album that needs to be fetched", "string")],
		"nickname" : "findTrackByAlbumId"
	},
	'action': function (req,res) {
		var sqlite3 = require('sqlite3').verbose();
		var db = new sqlite3.Database('db/products.db');
		var track = []

		var albumId = parseInt(req.params.albumId);

		console.log("--> findTrackByAlbumId");
		db.all("SELECT TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice FROM track WHERE AlbumId = " + albumId, function(err, rows) {
			rows.forEach(function (row) {
				track.push({	
					id: row.TrackId, 
					name: row.Name,
					albumId: row.AlbumId,
					mediaTypeId: row.MediaTypeId, 
					genreId: row.GenreId, 
					composer: row.Composer, 
					milliseconds: row.Milliseconds, 
					bytes: row.Bytes, 
					unitPrice: row.UnitPrice
				});
			});

			if(track) res.send(JSON.stringify(track));
			else throw swe.notFound('track');
			
			db.close();
		}); 
	}
};
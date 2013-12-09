#  Products backoffice mock data for bee-backend

### Sqlite3
```
// Install Sqlite
brew install Sqlite3 	//MAC OS X
apt-get install sqlite3 //Ubuntu

// Use the database
sqlite3 products.db
// Reset the database
sqlite3 products.db < products.sql
```

### Application
```
npm install
npm install sqlite3
```

### Start the server
```
node server.js
```

### Browse API
Go to the Swagger admin API on [http://host:port/docs](http://localhost:3302/docs) 

For POST/PUT/DELETE operation you need to set the api_key to `bee` (This can be changed in server.js file)

And take it easy !
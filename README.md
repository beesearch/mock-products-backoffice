#  Products backoffice 
#### Mock data for bee-backend

### Install the mock
```
npm install
npm install sqlite3
```

### Start the server
```
node server.js
```

### Sqlite3
Install Sqlite
```
brew install Sqlite3 	//MAC OS X
apt-get install sqlite3 //Ubuntu
```

Use the database
```
sqlite3 products.db
sqlite3 products.db < products.sql
```

You can now browse our API with the [Hive Control Center](https://github.com/beesearch/H2C)

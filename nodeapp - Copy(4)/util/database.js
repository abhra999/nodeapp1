const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
    MongoClient
        .connect('mongodb://localhost:27017/node_complete')
        .then((client) => {
            console.log('Db Connected');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
        })
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw new Error('Database Not Connected');
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
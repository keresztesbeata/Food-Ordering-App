const mongoose = require("mongoose");
const assert = require("assert");

// store database connection
let _db = null;

module.exports = {
    getDb: get_db,
    initDb: init_db
};

function init_db(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }

    // Set up default mongoose connection
    const mongoDB = "mongodb://localhost:27017/food_ordering_db";
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, _) => callback(err ? err : null));
    // Get the default connection
    _db = mongoose.connection;
    console.log("DB initialized - connected to: " + mongoDB);
    // Bind connection to error event (to get notification of connection errors)
    _db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

function get_db() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}
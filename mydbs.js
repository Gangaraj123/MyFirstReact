var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    const myobj = [
        { name: "New Garn", adress: "new Palem" },
        { name: "Raju", adress: "morthad" }
    ]

    var upd = { $set: { name: "Bopparam Gangaraju", adress: "Palem,mdl:Mortha" } };
    dbo.collection('customers').find().limit(2).toArray((err, res) => {
        if (err) console.log("error")
        console.log(res)
        db.close()
    })

});
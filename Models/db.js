// interacting with database-mongodbAtlas
const mongoose = require('mongoose')
const port =process.env.PORT || 3000;
const ConnectToMongoose = (app) => {
    mongoose.connect('mongodb+srv://202001107:Bopparam123@cluster0.i2yhz.mongodb.net/MyDataBase?retryWrites=true&w=majority')
        .then((result) => {
            console.log('Connected!!')
            app.listen(port); // launching app after connected to db
            // listening on port 3000
        })
        .catch((err) => {
            console.log("some error occured");
        })
}

module.exports = ConnectToMongoose;

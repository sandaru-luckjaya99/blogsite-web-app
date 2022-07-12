// db connection success

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = "mongodb+srv://admin:Reddragon@cluster0.242mk.mongodb.net/?retryWrites=true&w=majority"
// Connect MongoDB at default port 27017.
let mong = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

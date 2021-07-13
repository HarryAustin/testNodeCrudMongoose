
const mongoose = require('mongoose');

const connectDB = async (cb) => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            'useCreateIndex':true,
            'useFindAndModify':false,
            'useNewUrlParser':true,
            'useUnifiedTopology':true
        })
        console.log(`Mongo DB connected at ${connect.connection.host}`)
    }
    catch(err) {
        console.log(err)
        process.exit(0);
    }
    cb();
}

module.exports = connectDB;
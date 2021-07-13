const { Schema, model } = require('mongoose');

const pagesSchema = new Schema({
    nameOfPage: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'postsModel'}],
    dateCreated: Date,
    followers: Number,
    pageOwner: { type: Schema.Types.ObjectId, ref: 'userModel' },
    users: [{ type: Schema.Types.ObjectId, ref: 'userModel'}]
}, 
    { timeStamp:true }
)

const pagesModel = model('pagesModel', pagesSchema);


module.exports = pagesModel;
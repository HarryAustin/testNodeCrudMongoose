const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true},
    sex: String,
    active: { type: Boolean, default: false},
    createdAt: Date,
    posts: [{type: Schema.Types.ObjectId, ref: 'postsModel'}],
    profile: {type:Schema.Types.ObjectId, ref: 'profileModel'},
    pagesFollowed: [{ type: Schema.Types.ObjectId, ref: 'pagesModel'}]
}, 
    {timeStamp:true}
)

const userModel = model('userModel', userSchema);

module.exports = userModel;
const { Schema, model } = require('mongoose');

const postsSchema = new Schema({
    title: String,
    content: { type: String, required: true},
    createdAt: Date,
    user: {type:Schema.Types.ObjectId, ref: 'userModel'}
}, 
    {timeStamp:true}
)

const postsModel = model('postsModel', postsSchema);

module.exports = postsModel;
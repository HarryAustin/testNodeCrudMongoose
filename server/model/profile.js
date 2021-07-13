const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    bio: { type: String, required: true},
    createdAt: Date,
    user: {type:Schema.Types.ObjectId, ref: 'userModel'}
}, 
    {timeStamp:true}
)

const profileModel = model('profileModel', profileSchema);

module.exports = profileModel;
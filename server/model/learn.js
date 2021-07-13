
const express = require('express');
const { Schema, model } = require('mongoose');

const learnSchema = new Schema({
    name:{type:String, trim:true, require:true},
    age:{type:Number},
    school:{type:String, trim:true, require:true},
    category:{type:String, trim:true, require:true},
    schoolFees:{type:String, trim:true, require:true}
})

const learnModel = model('dataCollection', learnSchema)


module.exports = learnModel;
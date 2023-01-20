const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const excerciseTrackerSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    activityType:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
},{timestamps:true})

const excerciseTracker = mongoose.model('excerciseTracker',excerciseTrackerSchema);
module.exports = excerciseTracker;
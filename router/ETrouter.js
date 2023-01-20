const express = require ('express');
const excerciseTracker = require('../model/excerciseTracker');

const router = express.Router();

// post request to insert data into database

router.post('/add-task',(req,res)=>{

    const {name,description,activityType,duration,date} = req.body;

    const excerciseTracke = new excerciseTracker({
        name,
        description,
        activityType,
        duration,
        date
    })
    excerciseTracke.save()
    .then((result)=>{
        res.send("Record Added Succefully");
    })
    .catch((err)=>console.log(err));
})

// get request to fetch data from Database


router.get('/all-excercise',(req,res)=>{
    excerciseTracker.find().sort({createdAt:-1})
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))  
})

// Delete request to delete data from Database


router.delete('/dlt-excercise/:id',(req,res)=>{
    const id = req.params.id;
    excerciseTracker.findByIdAndDelete(id)
    .then( result => {
        res.send(result)
    })
    .catch(err=>console.log(err))
     
})

// put request to update data from Database


router.put('/update-exercise/:id', (req, res) => {
    const id = req.params.id;
    const {name,description,activityType,duration,date} = req.body;

    const updatedValue = ({
        name,
        description,
        activityType,
        duration,
        date
    })
    excerciseTracker.findByIdAndUpdate(id, updatedValue, {new: true})
    .then(result => res.send("Record Updated"))
    .catch(err => console.log(err))
});

module.exports = router;
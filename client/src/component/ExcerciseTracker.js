import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

export default function ExcerciseTracker() {

    const navigate = useNavigate();
    const location = useLocation();
   
    const [inputData, setInputData] = useState({
        name:'',
        description:'',
        activityType:'',
        duration:'',
        date:''
    })

    //inputHandler

    const inputHandler = (e) => {
        setInputData({...inputData,[e.target.name]:e.target.value})
    }

    //post request to insert data

    const addRecord = async (e) => {
        e.preventDefault();
        if(inputData.name !== '' && inputData.duration !== '' && inputData.description !== ''){
            try{
                const res = await axios.post('/add-task',inputData)
                alert(res.data);
                setInputData({
                    name:'',
                    description:'',
                    activityType:'',
                    duration:'',
                    date:''
                })
            }catch(err){
                alert("Record not added")
            }
        }
        else{
            alert("Please Do not left fields Empty")
        }
     
    }

    // navigate to ShowRecords 
    const showRecords = () => {
        navigate('/')
    }

    
    //fetching id from url
    let updateId = location.pathname.split('/')[2] 
    
    
    //put request for updating data
    const updateRecord = async (e) =>{
        e.preventDefault();
        if(inputData.name !== '' && inputData.duration !== '' && inputData.description !== ''){
            try{
                const res = await axios.put('/update-exercise/'+updateId,inputData)
                alert(res.data);
                navigate('/')
            }catch(err){
                alert("Record not added")
            }
        }
        else{
            alert("Please Do not left fields Empty")
        }

    }


  return (
    <div className='bg-dark d-flex justify-content-center align-items-center flex-row' style={{height:'100vh',}}>
        <div className='d-flex  align-items-center flex-column w-50 h-100 pt-5 '>
            <p className='text-white fs-3 text-gradient'>EXCERCISE TRACKER</p>
            <form className='w-100'>
                <div className="mb-2 ">
                    <label htmlFor="exampleInputEmail1" class="form-label text-white">Name</label>
                    <input type="text" name="name" value={inputData.name} onChange={inputHandler}  className="form-control border border-info bg-dark text-white"  id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-2 ">
                    <label htmlFor="exampleInputEmail1" class="form-label text-white">Description</label>
                    <textarea name="description" value={inputData.description} onChange={inputHandler} className="form-control border border-info bg-dark text-white" id="exampleFormControlTextarea1" rows="2"></textarea>
                </div>
                <div className="mb-2 ">
                <label htmlFor="exampleInputEmail1" className="form-label text-white">Activity Type</label>
                <select name="activityType"  onChange={inputHandler} value={inputData.activityType} className="form-select border border-info bg-dark text-white" aria-label="Default select example" >
                    <option value="type:">Choose Type</option>
                    <option value="run">Run</option>
                    <option value="bicycle">Bicycle Ride</option>
                    <option value="swim">Swim</option>
                    <option value="walk">Walk</option>
                    <option value="hike">Hike</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword1" class="form-label text-white">Duration</label>
                    <input name="duration" onChange={inputHandler} value={inputData.duration} type="number" className="form-control border border-info bg-dark text-white" id="exampleInputPassword1" />
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword1" class="form-label text-white ">Date</label>
                    <input onChange={inputHandler} value={inputData.date} name="date" require type="date" className="form-control border border-info bg-dark text-white" id="exampleInputPassword1" />
                </div>
                <div className='d-flex justify-content-center'>
                    {(updateId==undefined)?<button type="submit" className="btn btn-outline-info w-75 text-white " onClick={addRecord} >Add Records</button>:<button type="submit" className="btn btn-outline-info w-75 text-white " onClick={updateRecord} >Update Records</button>}
                </div>
                <div className='d-flex justify-content-center mt-2'>
                    <button className="btn btn-outline-info text-white w-75 " onClick={showRecords}>Show Records</button>
                </div>
            </form>
        </div>
    </div>
  )
}

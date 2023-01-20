import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function () {
    const [ExcerciseTrack, setExcerciseTrack] = useState([]);
    const navigate = useNavigate();

    //fetching data from db
    const fetchData = async () => {
        try {
            const res = await axios.get('/all-excercise')
            setExcerciseTrack(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const dlt = async (index) => {
        const id = index;
        try{
            const res = await axios.delete('/dlt-excercise/'+id)
            console.log(res);
            fetchData()
        }catch(err){
            console.log(err)
        }
        
    }

    // navigate to add records component
    const addRecords = () =>{
        navigate('/add-records')
    }

    //navigate to update records component
    const update = (id) => {
        navigate(`/add-records/${id}`)
    }

    
  return (
    <div style={{height:'100%'}}>
        <div className='text-center pt-4'>
            <button className='btn btn-outline-info text-center' onClick={addRecords}>Add Records</button>
        </div>
        <div className='container  pt-5'>
            <div className='row'>
                {ExcerciseTrack.map((currentval)=>{
                    return(
                    <div className='col-12 col-md-4 my-4'>
                        <div className="card text-dark border border-info rounded-3 " style={{width: '18rem',}}>
                            <div className="card-body" key={currentval.id}>
                                <h5 className="card-text"><b>Name:</b> {currentval.name}</h5>
                                <p className="card-text"><b>Description:</b> {currentval.description}</p>
                                <p className="card-text"><b>Activity Type:</b> {currentval.activityType}</p>
                                <p className="card-text"><b>Duration:</b> {currentval.duration}</p>
                                <p className="card-text"><b>Date: </b> {currentval.date}</p>
                                <div>
                                    <button className='btn-outline-danger btn mx-1' onClick={()=>dlt(currentval._id)}>Delete</button>
                                    <button className='btn bg-white' onClick={()=>update(currentval._id)}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )})
                }       
            </div>

        </div>
    </div>
  )
}

import React, {useState } from 'react'
import Dashboard from './Dashboard.module.css'
import axios from 'axios'
import {GetApi} from '../../CallApi'
import { validateForm } from '../../ValidateForm'

const AddLocation = () => {
const treatment=GetApi("https://healquickbackend-1.onrender.com/treat")
const [location,setlocation]=useState({treatName:'',location:''})
const changelocation=(e)=>{
  setlocation({...location,[e.target.name]:e.target.value})
}
const err=()=>{
  const errors=validateForm("location",location)
  document.getElementById("TreatmentERR").textContent=errors.TreatmentERR;
  document.getElementById("LocationERR").textContent=errors.LocationERR;
  return (Object.values(errors).filter(err=> err!=="").length > 0)
}
const submithandler=(e)=>{
  e.preventDefault()
  if(!err()){
  axios.post("https://healquickbackend-1.onrender.com/location",location)
  .then(res=>{alert(res.data);setlocation({treatName:'',location:''})})
  .catch(err=>{alert(err)})
  }
}

  return(
    <div>
        <div className={` ${Dashboard.form}`}>
             
             <form className='card  w-75 m-auto '>
               <h1 className='card-header'> ADD Location</h1>
               <div className='card-body my-3'>
                <input name='treatName' list='treatname' placeholder='treatment Name' value={location.treatName} onChange={changelocation} className='form-select'/>
                <datalist  id='treatname'>
                  {treatment.map((d,index)=>{
                    return(<option key={index} className=' dropdown-item' value={d.treatName}>{d.treatName}</option>)
                    
                  })}
                </datalist>
                <pre id="TreatmentERR" className='text-danger'></pre>
                <input type='text' placeholder='Add Location' name='location' onChange={changelocation}  value={location.location} className=' form-control'/>
                <pre id='LocationERR' className='text-danger'></pre>
                
                 
               </div>
               <div className='card-footer text-end'>
                 <button onClick={submithandler} className='btn btn-primary form-control-lg'>submit</button>
               </div>
               
             </form>
           </div>
    </div>
  )
}

export default AddLocation
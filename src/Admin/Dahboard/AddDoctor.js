import React, {useState } from 'react'
import Dashboard from './Dashboard.module.css'
import axios from 'axios'
import {GetApi} from '../../CallApi'
import { validateForm } from '../../ValidateForm'
const AddDoctor = () => {
  const [treatName,setTreatName]=useState('')
  const [location,setLocation]=useState('')
  const Treatment_location=GetApi("https://healquickbackend-1.onrender.com/location")||[]
  const treatments=Treatment_location?.map(doc=>{return doc.treatName})
  const filteredLocations = treatName? Treatment_location.find((t) => t.treatName === treatName)?.locations:[]
  const [doctor,setdoctor]=useState({doctorName:'',d_qual:'',d_num:'',d_email:'',d_experince:'',d_skills:'',Description:''})
  const changedata=(e)=>{
    setdoctor({...doctor,[e.target.name]:e.target.value})
  }
  const updatedDoctor={...doctor, treatName,location}
  const err=()=>{
      const errors=validateForm("doctor",updatedDoctor)
      document.getElementById("TreatmentERR").textContent=errors.TreatmentERR;
      document.getElementById("LocationERR").textContent=errors.LocationERR;
      document.getElementById("doctor_nameERR").textContent=errors.doctor_nameERR;
      document.getElementById("doctor_qualERR").textContent=errors.doctor_qualERR;
      document.getElementById("doctor_numERR").textContent=errors.doctor_numERR;
      document.getElementById("doctor_mailERR").textContent=errors.doctor_mailERR;
      document.getElementById("doctor_ExpERR").textContent=errors.doctor_ExpERR;
      document.getElementById("doctor_skillERR").textContent=errors.doctor_skillERR;
      document.getElementById("doctor_descriptionERR").textContent=errors.doctor_descriptionERR
      return (Object.values(errors).filter(err=> err!=="").length > 0)
    }
  const submit=(e)=>{
    e.preventDefault()
    if(!err()){
      console.log(doctor)
    axios.post("https://healquickbackend-1.onrender.com/doctor",updatedDoctor)
    .then(res=>{alert(res.data);
      setdoctor({...doctor,doctorName:'',d_qual:'',d_num:'',d_email:'',d_experince:'',d_skills:'',Description:''})
    setTreatName('')
      setLocation('')})
      
    .catch(err=>{alert(err)})
    }
  }
  
  
  return (
    <div className={` ${Dashboard.form}`}>
       
      <div className='card w-75'>
        <div className='card-header'>
           <h1>Add Doctor</h1>
        </div>
        <div className='card-body'>
          <form >
            <div className='d-flex'>
              <div className='w-100 me-2'>
            <select className='form-select me-2' name='treatName' onChange={(e)=>{setTreatName(e.target.value)}} value={treatName}>
              <option hidden>treatment Name</option>
              {treatments.map((t, index)=>{
               
                return(<option key={index} value={t}>{t}</option>)
                
              })}
            </select>
            <pre id='TreatmentERR' style={{color:'red'}}></pre>
            </div>
            <div className='w-100 me-2'>
            <select className='form-select' name='location' onChange={(e)=>{setLocation(e.target.value)}} value={location} disabled={!treatName} >
              <option hidden> Location</option>
              {filteredLocations.map((l,index)=>{
               
                return(<option key={index} value={l}>{l}</option>)
                
              })}
            </select>
            <pre id='LocationERR' style={{color:'red'}}></pre>
            </div>
            </div>
            <div className='d-flex '>
              <div className='w-100 me-2'>
                <input type="text" className='form-control' name='doctorName' onChange={changedata} placeholder='Doctor name' value={doctor.doctorName} />
                <pre id='doctor_nameERR' style={{color:'red'}}></pre>
              </div>
              <div className='w-100'>
                <input type='text' className='form-control' name='d_qual' onChange={changedata} placeholder='Doctor Qualification' value={doctor.d_qual}/>
                <pre id='doctor_qualERR' style={{color:'red'}}></pre>
              </div>
            </div>
            <div className='d-flex '>
              <div className='w-100 me-2'>
                <input type="text" className='form-control me-2' name='d_num' onChange={changedata} placeholder='Doctor Mobile no.' value={doctor.d_num} />
                <pre id='doctor_numERR' style={{color:'red'}}></pre>
              </div>
              <div className='w-100 '>
                <input type="text" className='form-control' name='d_email' onChange={changedata} placeholder='Doctor Email id' value={`${doctor.d_email}`}/>
                <pre id='doctor_mailERR' style={{color:'red'}}></pre>
               </div>
            </div>
            <div className='d-flex '>
              <div className='w-100 me-2'>
                <input type="text" className='form-control me-2' name='d_experince' onChange={changedata} placeholder='year of expirence' value={doctor.d_experince} />
                <pre id='doctor_ExpERR' style={{color:'red'}}></pre>
              </div>
              <div className='w-100 '>
                <input type='text' className='form-control ' name='d_skills' onChange={changedata} placeholder='Skills' value={doctor.d_skills} />
                <pre id='doctor_skillERR' style={{color:'red'}}></pre>
              </div>
            
            </div>
            <textarea className='form-control'rows={4} name='Description' onChange={changedata} placeholder='Description' value={doctor.Description}></textarea>
            <pre id='doctor_descriptionERR' className='text-danger'></pre>
          </form>
        </div>
        <div className='card-footer text-end'>
          <button onClick={submit} className='btn btn-primary'> Submit</button>
        </div>
      </div>
    </div>
  )
}

export default AddDoctor

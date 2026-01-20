import React, { useState } from 'react'
import Book from './Book.module.css'
import { Link, useLocation, useParams } from 'react-router'
import {GetApi} from '../CallApi'
import { validateForm } from '../ValidateForm'

const BookAppointmnet = () => {
  const {treatName1,location1,doctorName1}=useParams()
  const allLocation=GetApi("https://healquickbackend-1.onrender.com/location")
  const [treatName,setTreatName]=useState(treatName1 || '')
  const [location,setLocation]=useState(location1||'')
  const [doctorName,setdoctorName]=useState(doctorName1||'')
  const [patient,setpatient]=useState({patientName:'',patient_mobileNo:'',patient_mail:'',patient_Message:''})
  const treatments=allLocation.map(doc=>{return doc.treatName})
  const filteredLocations = treatName? allLocation.find((t) => t.treatName === treatName)?.locations||[]:[]
  const changedata=(e)=>{
    setpatient({...patient,[e.target.name]:e.target.value})}
  const {patientName,patient_mobileNo,patient_mail,patient_Message}=patient
  patient.treatName=treatName
  patient.location=location
  patient.doctorName=doctorName
  const err=()=>{
    const errors=validateForm("BookAppointment",patient)
    document.getElementById("TreatNameERR").textContent=errors.TreatNameERR;
    document.getElementById("LocationERR").textContent=errors.LocationERR;
    document.getElementById("doctor_nameERR").textContent=errors.doctor_nameERR;
    document.getElementById("patientNameERR").textContent=errors.patientNameERR;
    document.getElementById("patient_mobileNoERR").textContent=errors.patient_mobileNoERR;
    document.getElementById("patient_MailidERR").textContent=errors.patient_MailidERR;
    return   (Object.values(errors).filter(err=> err!=="").length > 0)
  }
  const postPatient=(e)=>{
    e.preventDefault(); 
    if(!err()){
     axios.post("https://healquickbackend-1.onrender.com/book",patient)
          .then(res=>{
            alert("Appointment has been Booked")
          })
          .catch(err=>{
            alert(err)
          })
        }
  }
  return (
    <div className={Book.head}>
    <div className={`${Book.Bookbanner}`}>
      <div  className={`${Book.title}`}>
        <h1>Book <span>Appointmnet</span></h1>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Book Appointment</li>
        </ol>
        </nav>
        </div>
    </div>
      <div className={Book.sect}>
        <form className='container-fluid'>
            <select  name='treatName' value={treatName}  onChange={(e)=>{setTreatName(e.target.value)}} className='form-select'>
                <option hidden> Treatment Name</option>
                {treatments.map(t=>{
                  return(
                  <option key={t} value={t}>{t}</option>
                )})}
            </select>
            <pre id='TreatNameERR'></pre>
            <select name='location' value={location} onChange={(e)=>{setLocation(e.target.value)}} className='form-select' disabled={!treatName}>
                <option hidden >Location</option>
                {filteredLocations.map(l=>{
                  return(
                    <option key={l} value={l}>{l}</option>
                  )
                })}
            </select>
            <pre id='LocationERR'></pre>
            <input type='text' className='form-control'  name='doctorName' placeholder='Doctor name' value={doctorName} onChange={(e)=>{setdoctorName(e.target.value)}}/>
            <pre id='doctor_nameERR'></pre>
            <input type='text' className='form-control' name='patientName' placeholder='Patient Name' value={patientName} onChange={changedata} />
            <pre id='patientNameERR'></pre>
            <input type='text' className='form-control' name='patient_mobileNo' placeholder='patient Mobile no' value={patient_mobileNo} onChange={changedata}/>
            <pre id='patient_mobileNoERR'></pre>
            <input type='text' className='form-control' name='patient_mail' placeholder='Patient Email id'value={patient_mail} onChange={changedata}/>
            <pre id='patient_MailidERR'></pre>
            <textarea placeholder='Message' className='form-control mb-3' name='patient_Message' rows={2} value={patient_Message} onChange={changedata}></textarea>
            <button onClick={postPatient} className='btn btn-primary'>submit</button>
        </form>
      </div>  
    </div>
  )
}

export default BookAppointmnet;

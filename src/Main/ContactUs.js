import React, { useState } from 'react'
import Book from './Book.module.css'
import { Link } from 'react-router'
import { validateForm } from '../ValidateForm'
import axios from 'axios'

const ContactUs = () => {
  const [contact,setContact]=useState({contact_name:"",contact_mobileNo:"",contact_Mailid:"",contact_Address:"",contact_description:""})
  
  const changedata=(e)=>{
    setContact({...contact,[e.target.name]:e.target.value})
  }
  const err=()=>{
    const errors=validateForm("contact",contact)
    document.getElementById("contact_nameERR").textContent=errors.contact_nameERR;
    document.getElementById("contact_mobileNoERR").textContent=errors.contact_mobileNoERR;
    document.getElementById("contact_MailidERR").textContent=errors.contact_MailidERR;
    document.getElementById("contact_AddressERR").textContent=errors.contact_AddressERR;
    return (Object.values(errors).filter(err=> err!=="").length > 0)
  }
  const SubmitContact=(e)=>{
    e.preventDefault()
    if(!err()){
      axios.post("https://healquickbackend-1.onrender.com/Contact",contact)
      .then(res=>{
        alert(res.data)
      })
      .catch(err=>{
        alert(err.meassage)
      })
    }   
  }
  return (<div className={Book.head}>     
  <div className={`${Book.contactBanner}`}>    
      <div  className={`${Book.title}`}>
        <h1>Contact <span>Us</span></h1>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
        </ol>
        </nav>
        </div>
    </div>
    
      
    
    <div className={`container-fluid ${Book.contact}`}>
        <div className="row w-75 m-auto" >
            <div className={`col-8 pe-3`}>
            <form  className='shadow p-5'>
                <input type='text' placeholder='Enter Name' name='contact_name' className='form-control mb-3' value={contact.contact_name} onChange={changedata}/>
                <pre className=' text-break' id='contact_nameERR'></pre>
                <input type='text' placeholder='Enter Mobile number' name='contact_mobileNo' className='form-control mb-3' value={contact.contact_mobileNo} onChange={changedata}/>
                <pre id='contact_mobileNoERR'></pre>
                <input type='text' placeholder='Enter Mail id' name='contact_Mailid' className='form-control mb-3' value={contact.contact_Mailid} onChange={changedata}/>
                <pre id='contact_MailidERR'></pre>
                <input type='text' placeholder='Enter Address' name='contact_Address' className='form-control mb-3' value={contact.contact_Address} onChange={changedata}/>
                <pre id='contact_AddressERR'></pre>
                <textarea name='contact_description' placeholder='Description' rows={2}className='form-control mb-3' value={contact.contact_description} onChange={changedata}></textarea>
                <button onClick={SubmitContact} className='btn btn-primary'> submit</button>
            </form>
            </div>
            
            <div  className={`col-4 shadow ${Book.contact2}`}>
                <div>
                    <h1>Address</h1>
                    <p> <i class="bi bi-house-door"></i> 12-11-629/67/2 L.N.Nagar Warasiguda, Secunderabad-500061</p>
                    <p> <i class="bi bi-telephone"></i> 9876543210</p>
                    <p> <i class="bi bi-envelope"></i> vaishnavinamala@gmail.com</p>
                </div>
             
            </div>
            
        </div>
        
    </div>
    </div>
  )
}

export default ContactUs
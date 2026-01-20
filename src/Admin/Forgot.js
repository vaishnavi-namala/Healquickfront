import React, { useState } from 'react'
import admin from './admin.module.css'
import {useNavigate } from 'react-router'
import axios from 'axios'
import { validateForm } from '../ValidateForm'

const Forgot = () =>{
  const navigate=useNavigate()
  const [email,setemail]=useState('')
  const [mobile,setmobile]=useState('')
  const err=()=>{
            const errors=validateForm("forgot",{email:email,mobile:mobile})
              document.getElementById("mailerr").textContent=errors.mailerr
              document.getElementById("mberr").textContent=errors.mberr
              return (Object.values(errors).filter(err=> err!=="").length > 0)
          }
  const submit=(e)=>{
    e.preventDefault()
    if(!err()){
      
      axios.post("https://healquickbackend-1.onrender.com/reset",{email:email,mobile:mobile})
      .then((res)=>{
        if(res.data==="does not exist"){
      throw new Error("does not exist")};
        else{navigate(`/reset/${email}`)}
      })
      .catch(err=>{
        alert(err)
      })
    }
  }
    const submithandler=(e)=>{
    e.preventDefault()
    if(!err()){
    axios.post('https://healquickbackend-1.onrender.com/forgot',{email:email,mobile:mobile})
    .then(res=>{
      if(res.data==="does not exist"){
      throw new Error("does not exist")}
      alert(res.data)
    })
    .catch(err=>{
      alert(err)
    })}
  }
  
  return (
    <div className={`container-fluid d-flex justify-content-center align-items-center ${admin.container}`}>
      <div className='card shadow p-3 w-50 h-50'>
        <div className='card-header py-5'>
          <h2>FIND YOUR ACCOUNT</h2>
        </div>
        <div className='card-body my-3'>
          <input type='text' placeholder='Email' name='email' value={email} onChange={(e)=>{setemail(e.target.value)}} className='form-control '/>
          <pre className='mb-3' id='mailerr'>  </pre>
          <input type='tel' placeholder='mobile number' name='mobile' value={mobile} onChange={(e)=>{setmobile(e.target.value)}} className='form-control '/>
          <pre className='mb-3' id='mberr'>  </pre>
        </div>
          <div className='card-footer py-4 d-flex justify-content-between'>
            <button onClick={submit} className='btn btn-primary'>Reset password</button>
            <button  onClick={submithandler} className='btn btn-primary'>forgot password</button>
          </div>
      </div>
    </div>
  )
}

export default Forgot

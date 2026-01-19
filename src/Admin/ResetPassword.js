import React from 'react'
import reset from '../Assets/reset.png'
import admin from './admin.module.css'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { validateForm } from '../ValidateForm'

const ResetPassword = () => {
    const {email}=useParams()
    const navigate=useNavigate()
    const [pass,setpass]=useState({password:'',conpassword:''})
    const changepass=(e)=>{
        setpass({...pass,[e.target.name]:e.target.value})
    }
    const {password,conpassword}=pass
    const err=()=>{
          const errors=validateForm("resetpassword",pass)
            document.getElementById("passworderr").textContent=errors.passworderr
            document.getElementById("conpasserr").textContent=errors.conpasserr
            return (Object.values(errors).filter(err=> err!=="").length > 0)
        }
    const settingpassword=(e)=>{
        e.preventDefault()
        if(!err()){
        axios.put(`https://healquickbackend-1.onrender.com/register/${email}`,{password:password})
        .then(res=>{
           alert(res.data)
            setpass({...pass,password:'',conpassword:''})
            navigate('/')
        })
        .catch(err=>{
            alert(err)
        })}
    }     
            
    

  return (
    <div className={`container-fluid ${admin.container}`}>
    <div className='row h-100'> 
        <div className='col-6'>
          <img src={reset} alt='' className='w-100 h-100 '/>
        </div>
        <div className={`col-6 my-auto p-5 `}>
            <div className={`p-4 w-75 mx-auto ${admin.text}`}>       
                         
                    <h1 className='mb-4'> Reset<br/> The <br />Password</h1>                
                    <form className='p-3 '>
                       <input type='text' name='email' placeholder='email' className='form-control mb-3 p-2' value={email} readOnly/>
                       <input type='text' name='password' placeholder='Reset Password' className='form-control mb-2 p-2' value={password} onChange={changepass} />
                       <p id='passworderr' className='text-danger mb-1'></p>
                       <input type='text' name='conpassword' placeholder='Confirm Password' className='form-control mb-2 p-2' value={conpassword} onChange={changepass}  />
                       <p id='conpasserr' className='text-danger mb-1'></p>
                    </form> 
                    <button onClick={settingpassword}><h6>Change Password</h6></button>
            </div>
        </div>
        
    </div>
    </div>
  )
}

export default ResetPassword
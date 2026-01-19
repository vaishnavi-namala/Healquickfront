import React, { useRef, useState } from 'react'
import { Row } from 'react-bootstrap'
import admin from './admin.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { validateForm } from '../ValidateForm'

const CreateAccount = () => {
    const [data,setdata]=useState({lname:'',fname:'',mobile:'',email:'',password:'',cpassword:'',description:''})
    const navigate=useNavigate()
    const changedata=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})}
    const {fname,lname,password,cpassword,email,mobile,description}=data
    const err=()=>{
      const errors=validateForm("createAccount",data)
        document.getElementById("firstnameERR").textContent=errors.firstnameERR
        document.getElementById("lastnameERR").textContent=errors.lastnameERR
        document.getElementById("mobileError").textContent=errors.mobileError
        document.getElementById("emailError").textContent=errors.emailError
        document.getElementById("passwordERR").textContent=errors.passwordERR
        document.getElementById("cpasswordERR").textContent=errors.cpasswordERR
        return (Object.values(errors).filter(err=> err!=="").length > 0)
    }
    const submithandler=(e)=>{
        e.preventDefault()
        if(!err()){
            axios.post("https://healquickbackend-1.onrender.com/register",{fname:fname,lname:lname,password:password,email:email,mobile:mobile,description:description})
            .then((res)=>{
                if(res.data=='Already account exists through this mailId'||res.data=='Already registered through this mobile number'||res.data=='please change the password'){
                    throw res.data}
               else{
                alert(res.data)
                setdata({...data,lname:'',fname:'',mobile:'',email:'',password:'',cpassword:'',description:''})
                navigate('/admin')
                }            
            })
            .catch((err)=>{
                if(err=='Already account exists through this mailId'){
                    document.getElementById("emailError").textContent='Already account exists through this mailId'
                }else if(err=='Already registered through this mobile number'){
                 document.getElementById("mobileError").textContent='Already registered through this mobile number'
                }else if(err=='please change the password'){
                    document.getElementById("passwordERR").textContent='please change the password'
                }else{
                    alert(err)
                }
            })
        }
        
        }
  return (
    <div className={`container-fluid ${admin.container}`}>
        <Row className={`d-flex justify-content-center align-item-center ${admin.Sucess}`} >
            
            <div className={`col-8 my-auto  p-0 `}>
        <form className={`w-100 `}>
            <h1 className='mb-4'>CREATE NEW ACCOUNT</h1>
            <div className='d-flex'>
                <div className='me-2  w-100'>
                    <input type='text' name='fname' placeholder='FIRST NAME'  value={fname} onChange={changedata} className='form-control' />
                    <p id="firstnameERR" style={{color:'red'}}></p>
                </div>
                <div className=' w-100'>
                <input type='text' name='lname' placeholder='LAST NAME'   value={lname} onChange={changedata} className='form-control' />
                <p id='lastnameERR' style={{color:'red'}}></p> 
                </div>
                
            </div>
            
            <div className='d-flex'>
                <div className='me-2 w-100'>
                    <input type='tel' name='mobile' placeholder='mobile' value={mobile} onChange={changedata} className='form-control'/>
                    <p id="mobileError" style={{color:'red'}}></p>
                </div>
                <div className='w-100'>
                    <input type='text' name='email' placeholder='Mail Id'  value={email} onChange={changedata} className='form-control'/>
                    <p id="emailError" style={{color:'red'}}></p>
                </div>
            </div>
            
            <div className='d-flex'>
                <div className='me-2 w-100'>
                <input type='password' name='password' placeholder='password'  value={password} onChange={changedata} className='form-control'/>
                <p id='passwordERR' style={{color:'red'}}></p>
                </div>
                <div className='w-100'>
                     <input type='password' name='cpassword' placeholder='confirm password'  value={cpassword} onChange={changedata}  className='form-control' />
                     <p id='cpasswordERR' style={{color:'red'}}></p>
                </div>
               
            </div>
            
            <textarea rows={3} name='description'  value={description} onChange={changedata} className='form-control mb-4'></textarea>
            <button className='btn  form-control mb-4' onClick={submithandler}>Create Account</button>
        <div className='text-end w-50 ms-auto'>
            <button className='btn w-25'  onClick={(e)=>{e.preventDefault();setdata({...data,lname:'',fname:'',mobile:'',email:'',password:'',cpassword:'',description:''})}}>Cancel</button>
        </div>
           
        </form>
         
        </div>
        </Row>
    </div>
  )
}

export default CreateAccount
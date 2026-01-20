import React, {useState } from 'react'
import login_img from '../Assets/Log.png'
import {Row } from 'react-bootstrap'
import axios from 'axios'
import admin from './admin.module.css'
import { Link, useNavigate } from 'react-router'
import { useContext } from 'react'
import { RoutProtect } from '../App'
import { validateForm } from '../ValidateForm'


const Admin = () => {
    const [data,setdata]=useState({email:'',password:''})
    const [token,settoken]=useContext(RoutProtect)
    const navigate=useNavigate()
    const changedata=(e)=>{
        setdata({...data,[e.target.name]: e.target.value})
    }
    const {email,password}=data
    const err=()=>{
        const errors=validateForm("admin",data);
        document.getElementById("mailerr").textContent=errors.mailerr
        document.getElementById("passworderr").textContent=errors.passworderr
        return (Object.values(errors).filter(err=> err!=="").length > 0)
    }
    const submithandler=(e)=>{
        e.preventDefault()
        if(!err()){
        axios.post("https://healquickbackend-1.onrender.com/login",data)
        .then((res)=>{
            if (!res.data.token) throw res.data
            settoken(res.data.token)
            })
        .catch((err)=>{
            document.getElementById("login").textContent=err;
        })
        if(token){
            navigate('/dashboard')
        }
    }
       
    }


  return (
    <div  className={`container-fluid ${admin.container}`}>
        <Row className={admin.Sucess} >
            <div className='col-5 p-0'>
                <img src={login_img} alt="login" className='w-100 h-100' />
            </div>
            <div className={`col-7 my-auto `}>
            <div className='w-50  mx-auto'>
                <form  className='mb-5 '>
                    <h1 className={`mb-3 ${admin.pr}`}><i className="bi bi-person"></i></h1>
                    <div className=' p-3 mb-3'>
                    <input type='text' name='email' placeholder='Email id' value={email} onChange={changedata}  className='form-control'/>
                    <pre id='mailerr' className='mb-2'>  </pre>
                    <input type='password' name='password' placeholder='Password' value={password} onChange={changedata} className='form-control'/>
                    <pre id='passworderr' className='mb-2'>  </pre>
                    <button className='btn btn-lg form-control mb-3'  onClick={submithandler}>Login</button>
                    
                    <Link to='/forgot' className={`text-center nav-link ${admin.a}`}>FORGOT PASSWORD?</Link>
                    </div>
                    <div className='d-flex justify-content-between' >
                    <button className='btn' onClick={(e)=>{e.preventDefault();setdata({...data,email:'',password:''})}}>Cancel</button>
                    <Link to='/createaccount' className={`nav-link ${admin.a}`}>CREATE NEW ACCOUNT</Link>
                    </div>
                </form>
                <p id='login' className='text-center text-danger'></p>
                </div>
            </div>
                
            
            
        </Row>
        
    </div>
  )
}

export default Admin

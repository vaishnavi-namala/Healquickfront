import React, { useState } from 'react'
import Dashboard from './Dashboard.module.css'
import axios from 'axios'
import { useRef } from 'react'
const AssociateHospitals = () => {
  const fileref=useRef()
  const[imgfile,setimgfile]=useState([])
  
  const fileupdate=(e)=>{
    setimgfile(Array.from(e.target.files))
  }
  const submithandler=(e)=>{
    e.preventDefault()
  const imgFileErr=document.getElementById("imgFileErr")
    if(imgfile.length == 0){
      imgFileErr.textContent='Upload atleast 1 file'
    }
    else if(imgfile.length>5){
      imgFileErr.textContent='can upload only 5 files'
    }else{
    const formdata=new FormData()
    imgfile.forEach(img=>{formdata.append("image",img)})
    axios.post("https://healquickbackend-1.onrender.com/associateHospital",formdata,{headers:{"Content-Type":"multipart/form-data"}}) 
    .then(res=>{
      alert(res.data)
      fileref.current.value=[]
    })  
    .catch(err=>{alert(err)})
    }
  }

  return (
    <div className={` ${Dashboard.form}`}>
      <form className='card  w-75 m-auto '>
        <h1 className='card-header'> Associate Hospitals</h1>
        <div className='card-body my-3'>
          <input type='file'  name='Hospitals'  multiple  ref={fileref} className=' form-control ' onChange={fileupdate}/>
          <pre id='imgFileErr' className='text-danger'></pre>                  
        </div>
        <div className='card-footer text-end'>
          <button onClick={submithandler} className='btn btn-primary form-control-lg'>submit</button>
        </div>
      </form>
    </div>
  )
}

export default AssociateHospitals
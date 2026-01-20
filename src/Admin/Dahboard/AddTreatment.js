import React, { useRef, useState } from 'react'
import Dashboard from './Dashboard.module.css'
import axios from 'axios'
import { validateForm } from '../../ValidateForm'
const AddTreatment = () => {
  const [treatment,setTreatment]=useState({treatName:'',image:'',description:''})
  const fileref=useRef()
  const changedata=(e)=>{
    if(e.target.name!=="image"){
   setTreatment({...treatment,[e.target.name]:e.target.value})}
   else{
    setTreatment({...treatment,[e.target.name]:e.target.files[0]})
   }
  }
  const {treatName,image,description}=treatment
  const err=()=>{
    const errors=validateForm("treatment",treatment)
      document.getElementById("TreatmentERR").textContent=errors.TreatmentERR;
      document.getElementById("ImageERR").textContent=errors.ImageERR;
      document.getElementById("treat_descriptionERR").textContent=errors.treat_descriptionERR;
      
      return (Object.values(errors).filter(err=> err!=="").length > 0)
  }
  
  const submithandler=(e)=>{
    e.preventDefault()
    if(!err()){
    const formdata=new FormData()
    formdata.append("treatName",treatName)
    formdata.append("image",image)
    formdata.append("description",description)
    axios.post('https://healquickbackend-1.onrender.com/treat',formdata,{headers:{"Content-Type": "multipart/form-data"}})
    .then(res=>{
      if(res.data==="couldnt post data"){
      throw new Error("couldn't post data")};
      alert(res.data);
      setTreatment({...treatment,treatName:'',description:''})
      fileref.current.value=null
      
    })
    .catch(err=>{alert(err.message)})
  }
  }
  return (
    <div className={` ${Dashboard.form}`}>
      
      <form className='card  w-75 m-auto '>
        <h1 className='card-header'> ADD Treatment</h1>
        <div className='card-body my-3'>
          <input type='text' placeholder='treatment name' className='form-control' name='treatName' value={treatment.treatName} onChange={changedata}/>
          <pre id="TreatmentERR" className='text-danger'></pre>
          <input type='file' placeholder='image path ' className='form-control' name='image' ref={fileref} onChange={changedata}/>
          <pre id="ImageERR" className='text-danger'></pre>
          <textarea rows='4' placeholder='description' className='form-control' name='description' value={treatment.description}  onChange={changedata}></textarea>
          <pre id="treat_descriptionERR" className='text-danger'></pre>
        </div>
        <div className='card-footer'>
          <button className='btn btn-primary form-control-lg' onClick={submithandler}>submit</button>
        </div>
        
      </form>
      
    </div>
  )
}

export default AddTreatment

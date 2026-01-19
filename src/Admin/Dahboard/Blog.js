import React, { useRef, useState } from 'react'
import Dashboard from './Dashboard.module.css'
import axios from 'axios'
import { validateForm } from '../../ValidateForm'

const Blog = () => {
  const [blog,setBlog]=useState({blog_image:'',blog_title:'',blog_description:''})
  const fileRef=useRef()
  const ChangeBlog=(e)=>{
    if(e.target.name==='blog_image'){
      setBlog({...blog,[e.target.name]:e.target.files[0]})
    }else{
      setBlog({...blog,[e.target.name]:e.target.value})
    }
  }
  const {blog_image,blog_title,blog_description}=blog
  const err=()=>{
    const errors=validateForm("blog",blog)
      document.getElementById("blog_imageERR").textContent=errors.blog_imageERR;
      document.getElementById("blog_titleERR").textContent=errors.blog_titleERR;
      document.getElementById("blog_descriptionERR").textContent=errors.blog_descriptionERR;
  return (Object.values(errors).filter(err=> err!=="").length > 0)
  }
  const postBlog=(e)=>{
    e.preventDefault()
    if(!err()){
    const formdata=new FormData()
    formdata.append("blog_image",blog_image)
    formdata.append("blog_title",blog_title)
    formdata.append("blog_description",blog_description)
    axios.post('https://healquickbackend-1.onrender.com/blog',formdata,{headers:{"Content-Type": "multipart/form-data"}})
    .then(res=>{
      if(res.data==="couldnt post data") throw "couldnt post data"
      alert(res.data);
      setBlog({...blog,blog_title:'',blog_description:''})
      fileRef.current.value=null
      
    })
    .catch(err=>{alert(err.message)})
  }
  }
  return (
    
        <div className={` ${Dashboard.form}`}>
                     
                     <form className='card  w-75 m-auto '>
                       <h1 className='card-header'> ADD Blogs</h1>
                       <div className='card-body my-3'>
                        <input type='file' name='blog_image' onChange={ChangeBlog} ref={fileRef} className=' form-control'/>
                        <p id="blog_imageERR" className='text-danger'></p>    
                        <input type='text' name='blog_title' onChange={ChangeBlog} value={blog_title} className=' form-control' placeholder='Blog Title'/> 
                        <p id="blog_titleERR" className='text-danger'></p>    
                        <textarea placeholder='description'onChange={ChangeBlog} value={blog_description} rows={4} className='form-control' name='blog_description'></textarea>     
                        <p id="blog_descriptionERR" className='text-danger'></p>           
                       </div>
                       <div className='card-footer text-end'>
                         <button onClick={postBlog} className='btn btn-primary form-control-lg'>submit</button>
                       </div>
                       
                     </form>
                   </div>
  
  )
}

export default Blog
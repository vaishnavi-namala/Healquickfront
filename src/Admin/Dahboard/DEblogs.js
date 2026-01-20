import React, {useState } from 'react'
import dashboard from './Dashboard.module.css'
import Main from '../../Main/Main.module.css'
import Dashboard from './Dashboard.module.css'
import axios from 'axios'
import { DeleteApi,GetApi } from '../../CallApi'


const DEblogs = () => {
    const Blogs=GetApi("https://healquickbackend-1.onrender.com/blog")
    const [blog,setBlog]=useState({blog_image:'',blog_title:'',blog_description:''})
      const ChangeBlog=(e)=>{
        if(e.target.name==='blog_image'){
          setBlog({...blog,[e.target.name]:e.target.files[0]})
        }else{
          setBlog({...blog,[e.target.name]:e.target.value})
        }
      }
      const {blog_image,blog_title,blog_description}=blog
      const getblog=(b_id)=>{
        axios.get(`https://healquickbackend-1.onrender.com/blog/${b_id}`)
        .then(res=>{ setBlog(res.data)})
        .catch(err=>{alert(err)})
      }
      const editBlog=()=>{
        const formdata=new FormData()
        formdata.append("blog_image",blog_image)
        formdata.append("blog_title",blog_title)
        formdata.append("blog_description",blog_description)
        axios.put(`https://healquickbackend-1.onrender.com/blog/${blog._id}`,formdata,{headers:{"Content-Type": "multipart/form-data"}})
        .then(res=>{
          alert(res.data);         
        })
        .catch(err=>{alert(err.message)})
      }
  return (
    <div className={`container ${Dashboard.treat}`}>
        
            {Blogs.map((blog,index)=>{return (
                <div className={ ` shadow my-3 ${dashboard.BlogMain}`}>
            <div key={index} className='row '>
                <div className='col-lg-4'><img src={`https://healquickbackend-1.onrender.com/${blog.blog_image}`} alt='Blog_image' className={Main.blogImg} /></div>
                <div className='col-lg-8'>
                    <h3 className='w-75'>{blog.blog_title}</h3>
                    <p className='text-break'>{blog.blog_description}</p>
                    <div className={dashboard.butt}>
                        <button onClick={()=>{getblog(blog._id)}} className={`${dashboard.edit}`} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-pencil-fill"></i></button>
                        <button onClick={()=>{DeleteApi(`https://healquickbackend-1.onrender.com/blog/${blog._id}`)}} className={`text-danger ${dashboard.edit}`}><i className="bi bi-trash3"></i></button>
                    </div>

                </div>
            </div>
            </div>
            )})}
       <div class="modal fade" id="exampleModal" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form className='card p-1 w-75 m-auto '>
            <input type='file' name='blog_image' onChange={ChangeBlog} className=' form-control'/>
            <p id="blog_imageERR" className='text-danger'></p>    
            <input type='text' name='blog_title' onChange={ChangeBlog} value={blog_title} className=' form-control' placeholder='Blog Title'/> 
            <p id="blog_titleERR" className='text-danger'></p>    
            <textarea placeholder='description'onChange={ChangeBlog} value={blog_description} rows={4} className='form-control' name='blog_description'></textarea>     
            <p id="blog_descriptionERR" className='text-danger'></p>           
                       
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" onClick={()=>{editBlog()}} class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> 

    </div>
  )
}

export default DEblogs

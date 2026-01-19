import React ,{ useState } from 'react'
import Dashborad from './Dashboard.module.css'
import axios from 'axios'
import {DeleteApi, GetApi} from '../../CallApi'


const DEtreatment = () => {
  const treats=GetApi("https://healquickbackend-1.onrender.com/treat")
  const [treat,settreat]=useState({treatName:'',image:'',description:''})
  const changedata=(e)=>{
    if(e.target.name!=="image"){
     settreat({...treat,[e.target.name]:e.target.value})
    }else{
     settreat({...treat,[e.target.name]:e.target.files[0]})
    }
  }
  const gettrt=(tid)=>{
    axios.get(`https://healquickbackend-1.onrender.com/treat/${tid}`)
    .then(res=>{settreat(res.data)})
    .catch(err=>{alert(err)})
  }
  const {treatName,image,description}=treat
  const edittrt=()=>{
    const formdata=new FormData()
    formdata.append("treatName",treatName)
    formdata.append("image",image)
    formdata.append("description",description)
    axios.put(`https://healquickbackend-1.onrender.com/treat/${treat._id}`,formdata,{headers:{"Content-Type": "multipart/form-data"}})
    .then(res=>{console.log(res.data)})
    .catch(err=>{alert(err)})
  }
  
  return (
    <div className={`${Dashborad.treat}`}>
       <div className={Dashborad.treatcontainer}>
      {treats.map(treat=>{
        return(
         <div className={Dashborad.treatcard}>
          <img src={`https://healquickbackend-1.onrender.com${treat.image}`} alt=''  className={Dashborad.treatImg}/>
          <div>
          <h4>{treat.treatName}</h4>
          <p>{treat.description}</p>
          </div>
          <div className={Dashborad.butt}>
            <button className={Dashborad.edit} onClick={()=>{gettrt(treat._id)}} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-pencil-fill"></i></button>
            <button onClick={()=>{DeleteApi(`https://healquickbackend-1.onrender.com/blog/${treat._id}`)}} className={`text-danger ${Dashborad.edit}`}><i className="bi bi-trash3"></i></button>
          </div>
         </div>
        )
      })}
      </div>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <input type='text' placeholder='treatment name' className='form-control mb-3' name='treatName' value={`${treat.treatName}`} onChange={changedata}/>
          <input type='file' placeholder='image path' className='form-control mb-3' name='image'  onChange={changedata}/>
          <textarea rows='4' placeholder='description' className='form-control mb-3' name='description' value={`${treat.description}`}  onChange={changedata}></textarea>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  onClick={edittrt} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default DEtreatment
import React ,{ useState }from 'react'
import Dashborad from './Dashboard.module.css'
import axios from 'axios'
import {DeleteApi, GetApi} from '../../CallApi'

const DEdoctor = () => {
  const Doctors=GetApi(`https://healquickbackend-1.onrender.com/doctor`)
  const [treatName,setTreatName]=useState('')
    const [location,setLocation]=useState('')
    const Treatment_location=GetApi("https://healquickbackend-1.onrender.com/location")
    const treatments=Treatment_location.map(doc=>{return doc.treatName})
    const filteredLocations = treatName? Treatment_location.find((t) => t.treatName === treatName)?.locations:[]
    const [doctor,setdoctor]=useState({doctorName:'',d_qual:'',d_num:'',d_email:'',d_experince:'',d_skills:'',Description:''})
    const changedata=(e)=>{
      setdoctor({...doctor,[e.target.name]:e.target.value})
    }
    doctor.treatName=treatName
    doctor.location=location
    const getDoctor=(d_id)=>{
      axios.get(`https://healquickbackend-1.onrender.com/doctor/${d_id}`)
      .then(res=>{
        setdoctor(res.data)
        setTreatName(res.data.treatName)
        setLocation(res.data.location)
      })
      .catch(err=>{
        alert(err)
      })
    }
  const editDoctor=()=>{
    axios.put(`https://healquickbackend-1.onrender.com/doctor/${doctor._id}`,doctor)
    .then(res=>console.log(res.data))
    .catch(err=>{alert(err)})
  }
  return (
    <div className={` py-5 ${Dashborad.treat}`}>
      {Doctors.map(d=>{
        return(            
            <div key={d._id} className={`row mb-3 ${Dashborad.Doctorcard}`}>
              <div className='col-lg-4 text-center my-auto'><h4>{d.treatName}<br/> at<br/> {d.location}</h4></div>
                <div className='col-lg-4 col-md-6'>
                    <h4>Dr.{d.doctorName}</h4>
                    <h6> {d.d_skills}</h6>
                    <p><strong>Qualification :</strong> {d.d_qual}</p>
                    <p><strong>Experinence :</strong> {d.d_experince} yrs</p>
                    <p><strong>Email :</strong> {d.d_email}</p>
                    <p><strong>Location :</strong> {d.location}</p>
                    <p><strong>Phone :</strong><span> {d.d_num}</span></p>
                </div>
                <div className={`col-lg-4 col-md-6 my-auto ${Dashborad.center}`}>
                    <p>{d.Description}</p>
                </div>
                <div className={`text-end ${Dashborad.butt}`}>
                  <button className={`${Dashborad.edit}`} onClick={()=>getDoctor(d._id)} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-pencil-fill"></i></button>
                  <button onClick={()=>{DeleteApi(`https://healquickbackend-1.onrender.com/blog/${d._id}`)}} className={`text-danger ${Dashborad.edit}`}><i className="bi bi-trash3"></i></button>
                </div>
            </div>
        
        )
      })}
              <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
      </div>
      <div className="modal-body">
        <form >
            <div className='d-flex'>
              <div className='w-100 me-2'>
            <select className='form-select me-2' name='treatName' onChange={(e)=>{setTreatName(e.target.value)}} value={treatName}>
              <option hidden>treatment Name</option>
              {treatments.map((t, index)=>{
                return(<option key={index} value={t}>{t}</option>) 
              })}
            </select>
            <pre id='TreatmentERR' style={{color:'red'}}> </pre>
            </div>
            <div className='w-100 me-2'>
            <select className='form-select' name='location' onChange={(e)=>{setLocation(e.target.value)}} value={location} disabled={!treatName} >
              <option hidden> Location</option>
              {filteredLocations.map((l,index)=>{
               
                return(<option key={index} value={l}>{l}</option>)
                
              })}
            </select>
            <pre id='LocationERR' style={{color:'red'}}> </pre>
            </div>
            </div>
            <div className='d-flex '>
              <div className='w-100 me-2'>
                <input type="text" className='form-control' name='doctorName' onChange={changedata} placeholder='Doctor name' value={doctor.doctorName} />
                <pre id='doctor_nameERR' style={{color:'red'}}> </pre>
              </div>
              <div className='w-100'>
                <input type='text' className='form-control' name='d_qual' onChange={changedata} placeholder='Doctor Qualification' value={doctor.d_qual}/>
                <pre id='doctor_qualERR' style={{color:'red'}}>  </pre>
              </div>
            </div>
            <div className='d-flex '>
              <div className='w-100 me-2'>
                <input type="text" className='form-control me-2' name='d_num' onChange={changedata} placeholder='Doctor Mobile no.' value={doctor.d_num} />
                <pre id='doctor_numERR' style={{color:'red'}}>  </pre>
              </div>
              <div className='w-100 '>
                <input type="text" className='form-control' name='d_email' onChange={changedata} placeholder='Doctor Email id' value={`${doctor.d_email}`}/>
                <pre id='doctor_mailERR' style={{color:'red'}}>  </pre>
               </div>
            </div>
            <div className='d-flex '>
              <div className='w-100 me-2'>
                <input type="text" className='form-control me-2' name='d_experince' onChange={changedata} placeholder='year of expirence' value={doctor.d_experince} />
                <pre id='doctor_ExpERR' style={{color:'red'}}>  </pre>
              </div>
              <div className='w-100 '>
                <input type='text' className='form-control ' name='d_skills' onChange={changedata} placeholder='Skills' value={doctor.d_skills} />
                <pre id='doctor_skillERR' style={{color:'red'}}> </pre>
              </div>
            
            </div>
            <textarea className='form-control'rows={4} name='Description' onChange={changedata} placeholder='Description' value={doctor.Description}></textarea>
            <pre id='doctor_descriptionERR' className='text-danger'></pre>
          </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={editDoctor}>Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default DEdoctor
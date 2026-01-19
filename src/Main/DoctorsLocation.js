import React from 'react'
import {GetApi} from '../CallApi'
import { Link, useParams } from 'react-router'
import Book from './Book.module.css'

const DoctorsLocation = () => {
    const {treatName,location}=useParams()
    const Doctors=GetApi("https://healquickbackend-1.onrender.com/doctor")
    const doctorLocation=Doctors.filter((doctor)=>{
        return(doctor.location==location && doctor.treatName==treatName)
    })
  return (<div className={Book.head}>
    <div className={`${Book.treatBanner}`}>
                      <div   className={`${Book.title}`}>
                        <h1>Doctors</h1>
                        <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                          <li className="breadcrumb-item"><Link to="/treatment">Treatments</Link></li>
                          <li className="breadcrumb-item"><Link to={`/location/${treatName}`}>Locations</Link></li>
                          <li className="breadcrumb-item active" aria-current="page">Doctors</li>
                        </ol>
                        </nav>
                        </div>
                    </div>
    <div className="container-fluid">
    {doctorLocation.map(d=>{
        return(
            
            <div key={d._id} className={`row m-3 ${Book.Doctorcard}`}>
                <div className='col-lg-4 col-6'>
                    <h1>Dr.{d.doctorName}</h1>
                    <h4> {d.d_skills}</h4>
                    <p><strong>Qualification :</strong> {d.d_qual}</p>
                    <p><strong>Experinence :</strong> {d.d_experince} yrs</p>
                    <p><strong>Email :</strong> {d.d_email}</p>
                    <p><strong>Location :</strong> {d.location}</p>
                    <p><strong>Phone :</strong><span> {d.d_num}</span></p>
                </div>
                <div className={`col-lg-4 col-6 ${Book.center}`}>
                    <p>{d.Description}</p>
                </div>
                <div className={`col-lg-4  ${Book.end}`}>
                    <div>
                    <Link to={`/BookAppointment/${d.treatName}/${d.location}/${d.doctorName}`}> BookAppointment</Link>
                    <br/>
                    <button className={Book.btn}>Call Now</button>
                    </div>
                </div>
            </div>
        )
    })}
    </div>
    </div>
  )
}

export default DoctorsLocation
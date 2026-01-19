import React, { useState } from 'react'
import main from './Main.module.css'
import {GetApi} from '../CallApi'
import dashboard from '../Admin/Dahboard/Dashboard.module.css'
import { Link } from 'react-router'
import axios from 'axios'
import doctor from '../Assets/doctor.png'
import techniques from '../Assets/techniques.png'
import diagnosis from '../Assets/diagnosis.png'
import treatment from '../Assets/treatment.png'
import { validateForm } from '../ValidateForm'


const Home = () => {
    const Hospitals=GetApi("https://healquickbackend-1.onrender.com/associateHospital")
    const blogs=GetApi("https://healquickbackend-1.onrender.com/blog")
    const blogstodisplay=blogs.slice(0,4)
    const offers=GetApi("https://healquickbackend-1.onrender.com/offer")
    const [quick,setQuick]=useState({patient_Name:'',patient_mobileNo:'',patient_mailId:''})
    const changedata=(e)=>{
      setQuick({...quick,[e.target.name]:e.target.value})
    }
    const err=()=>{
      const errors=validateForm("quick",quick)
      document.getElementById("patient_NameERR").textContent=errors.patient_NameERR;
    document.getElementById("patient_mobileNoERR").textContent=errors.patient_mobileNoERR;
    document.getElementById("patient_mailIdERR").textContent=errors.patient_mailIdERR;
    return (Object.values(errors).filter(err=> err!=="").length > 0)
    }
    const submitHandler=(e)=>{
      e.preventDefault()
      if(!err()){
      axios.post("https://healquickbackend-1.onrender.com/quick",quick)
      .then(res=>{
        alert(res.data)
      })
      .catch(err=>{
        alert(err)
      })
    }
    }
 return (
    <>
        <ul className={main.offer}>
          {offers.map((offer)=>{
            return(
              <li>{offer.OfferTitle}</li>
            )
          })}
        </ul>
        <div className={`container-fluid ${main.image}`}>
          <div className='row h-100 '>
            <div className={`col-lg-4 col-md-7 ms-lg-2 ps-lg-3 ${main.fig}`}>
              <div>
              <figure>
                <img width="100" height="100" src={doctor} alt="doctor-female-skin-type-5"/>
                <figcaption>TRUSTED SPECIALIST</figcaption>
              </figure>
              </div>
              <div>
              <figure>
                <img width="100" height="100" src={techniques} alt="hospital-bed"/>
                <figcaption>MODERN TECHNIQUES</figcaption>
              </figure>
              </div>
              <div>
              <figure>
                <img width="100" height="100" src={diagnosis} alt="external-medical-medical-filled-outline-filled-outline-satawat-anukul-6"/>
                <figcaption>PRECISE DIAGNOSIS</figcaption>
              </figure>
              </div>
              <div>
              <figure>
               <img width="100" height="100" src={treatment} alt="hospital-2"/>
                <figcaption>ADVANCED TREATMENTS</figcaption>
              </figure>
              </div>
              
              </div>
              <div className={`ps-5 ${main.content}`}>
              <p>-Your Journey To Better Health Begins Here</p>
              <button> Quick Appointment</button>
              </div>
          </div>
          
        </div>
        <div className={`${main.block}`}>
        <div className={`${main.stepSection}`}>
          <h1 className={` ${main.title}`}>Welcome to <span>HEAL QUICK</span></h1>
            <p className={`${main.subtitle}`}>
              Heal Quick is committed to delivering high-quality healthcare services with efficiency and expertise. Our experienced professionals use proven methods and modern solutions to ensure you receive effective care—quickly and safely. Your well-being is our mission.
            </p>
            <div className={`m-5 ${main.stepswrapper}`}>
                <div className={`${main.stepBox}`}>
                  <h2>01</h2>
                  <p>Consultation to assess your condition.</p>
                </div>
                <div className={`${main.stepBox}`}>
                  <h2>02</h2>
                  <p>Suggestion of all possible treatment/surgical options.</p>
                </div>
                <div className={`${main.stepBox}`}>
                  <h2>03</h2>
                  <p>Admission and care under our expert team.</p>
                </div>
                <div className={`${main.stepBox}`}>
                  <h2>04</h2>
                  <p>Post care consult and home care services.</p>
                </div>
            </div>
        </div>
        
    <div className={`container ${main.associate}`}>
        <h1 className={` text-center ${main.title}`}>Associate <span>Hospitals</span></h1>
        <div className={` row m-4`}>
                {Hospitals.map((hospital,index)=>{
                  return(                    
                    hospital.image.map((i,index)=>{
                        return (
                            <div key={index} className={`col-lg-3 col-md-4 col-6 mb-3 `}>
                              <div className={dashboard.companyCard}>
                                <img src={`https://healquickbackend-1.onrender.com/${i}`} className={`w-100 h-100  `} />
                                </div>
                            </div>
                            )     
                    })
                  )
                })}                 
          </div>
    </div>
       <div className={`${main.blog}`}>
        <h1 className={` text-center ${main.title}`}>Our Blog</h1>
        <div className={`${main.blogContainer}`}>
      {blogstodisplay.map((blog) => (
        <div className={`${main.blogCard}`} key={blog._id}>
          <img src={`https://healquickbackend-1.onrender.com/${blog.blog_image}`} alt={blog.blog_title} className={`${main.blogImg}`} />

          <div className={`${main.blogContent}`}>
            <h3>{blog.blog_title}</h3>
            <p>{blog.blog_description}</p>
            <Link to='blog' className={`${main.readMore}`}>
              read more
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
    

<div  className='container-fluid p-5'>
    <h1 className={` text-center ${main.title}`}>Quick Appointment</h1>
    <form className='container w-50'>
        <input type='text' className=' form-control mb-3 p-3' name='patient_Name' placeholder='Name'  value={quick.patient_Name} onChange={changedata}/>
        <pre id='patient_NameERR'></pre>
        <input type='text' className=' form-control mb-3 p-3' name='patient_mobileNo' placeholder='Mobile number' value={quick.patient_mobileNo} onChange={changedata}/>
        <pre id="patient_mobileNoERR"></pre>
        <input type='text' className='form-control mb-3 p-3' name='patient_mailId' placeholder='Email id' value={quick.patient_mailId} onChange={changedata}/>
        <pre id="patient_mailIdERR"></pre>
        <button onClick={submitHandler} className='btn btn-primary'>Quick Appointment</button>
    </form>
</div>
   <div className={`${main.blog}`}>
    <h1 className={` text-center ${main.title}`}>Why Choose Us?</h1>
    <div className={`m-5 ${main.stepswrapper}`}>

        <div className={`${main.stepBox}`}>
            <h2>01</h2>
            <p>Consultation to assess your condition.</p>
        </div>

        <div className={`${main.stepBox}`}>
            <h2>02</h2>
            <p>Suggestion of all possible treatment/surgical options.</p>
        </div>

        <div className={`${main.stepBox}`}>
            <h2>03</h2>
            <p>Admission and care under our expert team.</p>
        </div>

        <div className={`${main.stepBox}`}>
            <h2>04</h2>
            <p>Post care consult and home care services.</p>
        </div>
    </div>
    </div>

    </div>

   </>
  )
}

export default Home
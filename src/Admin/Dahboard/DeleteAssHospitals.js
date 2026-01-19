import React from 'react'
import {DeleteApi, GetApi} from '../../CallApi'
import dashboard from './Dashboard.module.css'

const DeleteAssHospitals = () => {
    const Hospitals=GetApi("https://healquickbackend-1.onrender.com/associateHospital")
  return (
    <div className={`container ${dashboard.treat}`}>
        <div className={` row `}>
                        {Hospitals.map((hospital,index)=>{
                           
                          return(
                            
                            hospital.image.map((i,index)=>{
                                return (
                                    <div key={index} className={`col-lg-3 col-md-4 col-6 mb-3 `}>
                                      <div className={dashboard.companyCard}>
                                        <img src={`https://healquickbackend-1.onrender.com/${i}`} className={`w-100 h-100  `} />
                                        <button onClick={()=>{DeleteApi(`https://healquickbackend-1.onrender.com/associateHospital/${hospital._id}/${index}`)}} className={dashboard.butt}><i className="bi bi-trash"></i></button>

                                        </div>
                                    </div>
                                    )     
                            })
                          )
                        })}                 
                        </div>
    </div>
  )
}

export default DeleteAssHospitals
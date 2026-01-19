import React from 'react'
import {GetApi} from '../CallApi'
import Book from './Book.module.css'
import { Link, useParams } from 'react-router'

const TreatmentLocation = () => {
  const {treatName}=useParams()
  const locations=GetApi("https://healquickbackend-1.onrender.com/location")
  const TreatLocation=locations.find(location=>{
    return(location.treatName===treatName)
  })
  return (<div className={Book.head}>
    <div className={`${Book.treatBanner}`}>
                  <div  className={`${Book.title}`}>
                    <h1>Locations</h1>
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                      <li className="breadcrumb-item"><Link to="/treatment">Treatments</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Locations</li>
                    </ol>
                    </nav>
                    </div>
                </div>
                <div className={`container ${Book.container}`}>
    {TreatLocation?.locations?.map(l=>{
      return(<Link key={l} to={`/doctors/${treatName}/${l}`} className={`nav-link ${Book.location}`}><h1>{l}</h1></Link>)
    })}
    </div>
    </div>
  )
}

export default TreatmentLocation
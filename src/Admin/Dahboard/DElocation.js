import React from 'react'
import Dashborad from './Dashboard.module.css'
import { useState } from 'react'
import axios from 'axios'
import {DeleteApi, GetApi} from '../../CallApi'

const DElocation = () => {
  const Treatment_location=GetApi("https://healquickbackend-1.onrender.com/location")
  return (   
  <div className={`container ${Dashborad.treat}`}>
    {Treatment_location.map(doc=>{
      return(
        <div className='border my-3 p-3'>
          <h1 className='border-bottom'>{doc.treatName}</h1>
          <div className={Dashborad.location}>
          {doc.locations.map(location=>{
            return(<div>
              
                <p>{location}</p>
                <button onClick={()=>{DeleteApi(`https://healquickbackend-1.onrender.com/location/${doc._id}/${location}`)}}><i className="bi bi-trash"></i></button>
             </div> 
            )
          })} 
          </div>

        </div>
      )})}                    
  </div>
  )
}

export default DElocation
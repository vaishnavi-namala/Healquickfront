import React, { useState } from 'react'
import { GetApi} from '../CallApi'
import Treat from './Treat.module.css'
import { Link } from 'react-router'
import Book from './Book.module.css'

const Treatments = () => {
  const Treatment=GetApi("https://healquickbackend-1.onrender.com/treat")
  const offers=GetApi("https://healquickbackend-1.onrender.com/offer")
  return (

    <div className={Book.head}>
        <div className={`${Book.treatBanner}`}>
              <div  className={`${Book.title}`}>
                <h1>Treatments</h1>
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Treatments</li>
                  
                </ol>
                </nav>
                </div>
            </div>
            <div className={Treat.blog}>
        <div className={`${Treat.blogContainer}`}>
          {Treatment.map((treat,index)=>{
            return(
              <Link to={`/location/${treat.treatName}` } className={`nav-link ${Treat.blogC}`}>
                <img src={`https://healquickbackend-1.onrender.com${treat.image}`} alt="image" className={Treat.blogImg}/>
                <div className={`${Treat.blogContent}`}>
                  <h3>{treat.treatName}</h3>
                  <p>{treat.description}</p>
                </div>
              </Link>              
            )})}
        </div>
        <div className='container-fluid'>
          <div className=' row'>
        {offers.map(offer=>{
          return(<div className={`col-lg-6 p-0 ${Treat.offer}`}>
            <div className='m-3 p-3 shadow'>
            <h4>{offer.OfferTitle}</h4>
            <p>{offer.offerDescription}</p>
            </div>
          </div>)
        })}
        </div>
        </div>
        </div>
    </div>
  )
}

export default Treatments
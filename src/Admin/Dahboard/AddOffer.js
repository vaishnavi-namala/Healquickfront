import React from 'react'
import Dashboard from './Dashboard.module.css'
import { useState } from 'react'
import axios from 'axios'
import { validateForm } from '../../ValidateForm'
const AddOffer = () => {
  const [offer,setOffer]=useState({offerDescription:'',OfferTitle:''})
  const changeoffer=(e)=>{
    setOffer({...offer,[e.target.name]:e.target.value})
  }
  const err=()=>{
    const errors=validateForm("offer",offer)
    document.getElementById('offer_DescriptionERR').textContent=errors.offer_DescriptionERR;
    document.getElementById('offer_TitleERR').textContent=errors.offer_TitleERR;
    return (Object.values(errors).filter(err=> err!=="").length > 0)
  }
  const Submit=(e)=>{
    e.preventDefault()
   if (!err()){
    axios.post('https://healquickbackend-1.onrender.com/offer',offer)
    .then(res=>{
      alert(res.data)
      setOffer({...offer,offerDescription:'',OfferTitle:''})
    })
    .catch(err=>{
      alert(err)
    })
   }
  
  }
  return (
    <div className={`${Dashboard.form}`}>
      <div className='card w-50'>
        <div className=' card-header'>Add Offers</div>
        <div className=' card-body'>
          <form>
            <textarea rows={2} placeholder='offer Description' className='form-control' name='offerDescription' value={offer.offerDescription} onChange={changeoffer}></textarea>
            <pre id='offer_DescriptionERR' style={{color:'red'}}></pre>
            <input type='text' placeholder='OfferTittle' className='form-control'  name='OfferTitle' value={offer.OfferTitle}onChange={changeoffer} />
            <pre id='offer_TitleERR' style={{color:'red'}}></pre>
          </form>
        </div>
        <div className='card-footer text-end'>
          <button className='btn btn-primary' onClick={Submit}>Submit</button>
        </div>


      </div>
    </div>
  )
}

export default AddOffer

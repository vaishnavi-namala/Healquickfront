import React from 'react'
import Dashborad from './Dashboard.module.css'
import { useState } from 'react'
import axios from 'axios'
import {DeleteApi, GetApi} from '../../CallApi'

const DEOffers = () => {
  const offers=GetApi("https://healquickbackend-1.onrender.com/offer")
  const [offer,setOffer]=useState({offerDescription:'',OfferTitle:''})
  const changeoffer=(e)=>{
    setOffer({...offer,[e.target.name]:e.target.value})
  }
  const getoff=(oid)=>{
    axios.get(`https://healquickbackend-1.onrender.com/offer/${oid}`)
    .then(res=>{setOffer(res.data)})
    .catch(err=>{alert(err)})
  } 
  const editOffer=()=>{
    axios.put(`https://healquickbackend-1.onrender.com/offer/${offer._id}`,offer)
    .then(res=>{console.log(res.data)})
    .catch(err=>{alert(err)})
  }
  
  return (
    <div className={`${Dashborad.form}`}>
          <table className='table table-bordered w-75 mx-auto' >
            <thead>
              <tr >
                <th>Offer Description</th>
                <th>Offer Tittle</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {offers.map((off,index)=>{
                return(
                <tr key={index}>
                <td>{off.offerDescription}</td>
                <td>{off.OfferTitle}</td>
                
                <td>
                  <button onClick={()=>{DeleteApi(`https://healquickbackend-1.onrender.com/offer/${off._id}`)}}>delete</button>
                  <button onClick={()=>{getoff(off._id)}} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                </td>
              </tr>)
              }
              )}
              
            </tbody>
          </table>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <textarea rows={2} placeholder='offer Description' className='form-control mb-3' name='offerDescription' value={offer.offerDescription} onChange={changeoffer}></textarea>
            <pre id='OfferDesErr' style={{color:'red'}}></pre>
            <input type='text' placeholder='OfferTittle' className='form-control'  name='OfferTitle' value={offer.OfferTitle}onChange={changeoffer} />
            <pre id='offerTtlErr' style={{color:'red'}}></pre>
          </form>
      </div>
      <div class="modal-footer">
        <button onClick={editOffer} type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
  )
}

export default DEOffers
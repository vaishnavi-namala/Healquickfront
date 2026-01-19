import React from 'react'
import footer from './Footer.module.css'
import { Link } from 'react-router'
import {GetApi} from '../CallApi'
const Footer = () => {
     const treatment=GetApi("https://healquickbackend-1.onrender.com/treat")
  return (
   <>
    <div className={`container-fluid ${footer.foot}`}>
        <div className='row p-3'>
            <div className={`col-lg-4 ${footer.about}`}>
                <Link className={`navbar-brand ${footer.brandName}`} to='' >HEAL <br/><span>QUICK</span></Link>
                <p>We are committed to providing trusted, patient-centered healthcare solutions. Our mission is to deliver accessible, reliable, and high-quality medical services that support your well-being at every stage of life.</p>
            </div>
            <div className={`col-lg-8 container-fluid `}>
                <div className={`row ${footer.links}`}>
                <div className='col-4'>
                     <h3>Treatments</h3>
                     <ul className={`${footer.limited}`}>
                        {treatment.map((treat)=>{
                            return(
                               <li><Link to='treatment' className={footer.treats}>{treat.treatName}</Link></li> 
                            )
                        })}
                        
                     </ul>
                </div>
                <div className='col-4'>
                    <h3>Reach Us</h3>
                    <p><i className="bi bi-geo-alt"></i> 12-11-629/67/2 L.N.Nagar Warasiguda, Secunderabad-500061</p>
                </div>
                <div className="col-4">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><i class="bi bi-telephone"></i> 9876543210</li>
                        <li className=' text-break'><i class="bi bi-envelope"></i> vaishnavinamala@gmail.com</li>
                    </ul>
                </div>
                </div>

            </div>
        </div>
        </div>
        <div className={footer.cp}>
            <p>&copy;2025 Health care Treatment All Rights Reserved</p>
            <p>Designed By Vaishnavi</p>
        </div>
      </>  
    
  )
}

export default Footer
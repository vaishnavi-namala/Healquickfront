import React from 'react'
import { Link, NavLink } from 'react-router'
import header from './Header.module.css'

const Header = () => {
  return (
    
  <>
      
    <div className='container d-flex justify-content-between align-items-center'>
      <Link className={`navbar-brand ${header.brandName}`} to='' >HEAL <br/><span>QUICK</span></Link>
      <Link className={`${header.bookbutton}`} to='/bookappointment'>BookAppointmnet</Link>
      <Link className={header.Login} to='/admin'><i class="bi bi-person-circle"></i> LOG IN</Link>
    </div>
    <nav className="navbar navbar-expand-lg"  style={{backgroundColor:"#083758ff"}}>
       <div className={`container-fluid  ${header.menu}`} >
       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"><span className={`navbar-toggler-icon `}></span></button>
       <div className={`collapse navbar-collapse navbar-nav container ${header.navLink} `} id="navbarNav">
        <div className="nav-item ">
          <NavLink className={`nav-link`}  to='' >Home</NavLink>
        </div>
        <div className="nav-item ">
          <NavLink className={`nav-link`}  to='treatment'>Treatment</NavLink>
        </div>
        <div className="nav-item ">
          <NavLink className={`nav-link`}  to='bookappointment' >Book Appointment</NavLink>
        </div>
        <div className="nav-item">
          <NavLink className={`nav-link `}  to='blog' >Blog</NavLink>
        </div>
        <div className="nav-item">
          <NavLink className={`nav-link`}  to='contactus' >Contact Us </NavLink>
        </div>
      
    </div>
    </div>
    
    </nav>
  

    </>
  )
}

export default Header
import React from 'react'
import { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router'
import { RoutProtect } from '../../App'
import { useEffect } from 'react'
import axios from 'axios'
import dashboard from './Dashboard.module.css'
import Header from './Header'
import Footer from './Footer'

const Dashboard = () => {
    const [token]=useContext(RoutProtect)
    const navigate=useNavigate()
    useEffect(()=>{
      axios.get('https://healquickbackend-1.onrender.com/admin',{headers:{"x-token":token}})
      .then(res=>{
        if(res.data!=='admin'){
          navigate('/admin')     
        }
      })
      .catch(err=>{
        alert(err)
      })
    },[token,navigate])
    
    
   
  return (
    <div className={`container-fluid ${dashboard.dashboardcontainer} `}>
      
        <div className='row h-100'>
               <div className={`col-3 p-0 ${dashboard.aside}`}>
              <aside >    
                <nav className=' p-3 mb-2'>   
                <Link className='navbar-brand ' to=""><h3><strong>HEAL QUICK</strong></h3></Link>     
                </nav>  
              <div>
               <nav className="navbar bg-success-subtle  mb-1 p-2">
                        <Link className="nav-link" to="">Add Treatment</Link>
                </nav>
                <nav className="navbar bg-success-subtle  mb-1 p-2">
                        <Link className="nav-link " to='addlocation'>Add location</Link>
                </nav>
                <nav className="navbar bg-success-subtle mb-1 p-2">
                  <Link className='nav-link' to='adddoctor'>Add Doctor</Link>
                </nav>
                <nav className="navbar bg-success-subtle mb-1 p-2 ">
                  <Link className='nav-link' to='addoffer'>Add offers </Link>
                </nav>
                <nav className="navbar bg-success-subtle mb-1 p-2">
                  <Link className='nav-link' to='detreatment'>Delete &Edit Treatment</Link>
                </nav>
                <nav className="navbar bg-success-subtle mb-1 p-2">
                  <Link className='nav-link'to='delocation'>Delete & Edit location</Link>
                </nav>
                <nav className="navbar bg-success-subtle mb-1 p-2">
                  <Link className=' nav-link' to='dedoctor'> Delete & Edit Doctor</Link>
                </nav>
                <nav className="navbar bg-success-subtle mb-1 p-2">
                  <Link className='nav-link' to='deoffers'> Delete & Edit Offers</Link>
                </nav>
                <nav className="navbar bg-success-subtle  mb-1 p-2">
                  <Link className='nav-link' to='blog'> Blogs</Link>
                </nav>
                <nav className="navbar bg-success-subtle mb-1 p-2">
                  <Link className='nav-link' to='deblogs'>Delete & Edit Blogs</Link>
                </nav>
                <nav className="navbar bg-success-subtle mb-1 p-2">
                  <Link className='nav-link' to='associatehospitals'> Associated Hospitals</Link>
                </nav>
                <nav className="navbar bg-success-subtle mb-1 p-2">
                  <Link className='nav-link' to='deleteasshospital'>Delete Associated Hospitals</Link>
                </nav>
                <nav className="navbar bg-danger-subtle mb-2 p-2">
                  <Link className='nav-link' to='/admin'>Logout</Link>
                </nav>
                </div>
             </aside>
            </div>
            <div className='col-9 p-0'>
              <Header />
              <Outlet/>
               <Footer/>
            </div>
           
        </div>
    </div>
  )
}

export default Dashboard

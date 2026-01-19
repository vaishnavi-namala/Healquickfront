import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Admin from './Admin/Admin'
import Forgot from './Admin/Forgot'
import CreateAccount from './Admin/CreateAccount'
import Dashboard from './Admin/Dahboard/Dashboard'
import ResetPassword from './Admin/ResetPassword'
import AddTreatment from './Admin/Dahboard/AddTreatment'
import Addlocation from './Admin/Dahboard/AddLocation'
import AddDoctor from './Admin/Dahboard/AddDoctor'
import Addoffer from './Admin/Dahboard/AddOffer'

import DEtreatment from './Admin/Dahboard/DEtreatment'
import DElocation from './Admin/Dahboard/DElocation'
import DEdoctor from './Admin/Dahboard/DEdoctor'
import DEoffers from './Admin/Dahboard/DEOffers'
import AssociateHospitals from './Admin/Dahboard/AssociateHospitals'
import Blog from './Admin/Dahboard/Blog'
import Main from './Main/Main'
import Home from './Main/Home'
import Treatments from './Main/Treatments'
import ContactUs from './Main/ContactUs'
import OurBlogs from './Main/OurBlogs'
import BookAppointmnet from './Main/BookAppointmnet'
import DeleteAssHospitals from './Admin/Dahboard/DeleteAssHospitals'
import DEblogs from './Admin/Dahboard/DEblogs'
import NoPage from './Main/NoPage'

import TreatmentLocation from './Main/TreatmentLocation'
import DoctorsLocation from './Main/DoctorsLocation'

const Routing = () => {
  return (
    <Routes>
      <Route path='/' Component={Main}>
      <Route path='' Component={Home} />
      <Route path='treatment' Component={Treatments} />
      <Route path='location/:treatName' Component={TreatmentLocation} />
      <Route path='doctors/:treatName/:location' Component={DoctorsLocation} />
      <Route path='blog' Component={OurBlogs} />
      <Route path='bookappointment' Component={BookAppointmnet} />
      <Route path='bookappointment/:treatName1/:location1/:doctorName1' Component={BookAppointmnet} />
      <Route path='contactus' Component={ContactUs} />
    </Route>
    <Route path='/admin' Component={Admin} /> 
    <Route path='/forgot' Component={Forgot}/>
    <Route path='/createaccount' Component={CreateAccount}/>
    <Route path='/dashboard' Component={Dashboard} >
      <Route path='' Component={AddTreatment} />
      <Route path='addlocation' Component={Addlocation} />
      <Route path='adddoctor' Component={AddDoctor}/>
      <Route path='addoffer' Component={Addoffer}/>
      <Route path='detreatment' Component={DEtreatment}/>
      <Route path='delocation' Component={DElocation}/>
      <Route path='dedoctor' Component={DEdoctor}/>
      <Route path='deoffers' Component={DEoffers} />
      <Route path='blog' Component={Blog} />
      <Route path='deblogs' Component={DEblogs} />
      <Route path='associatehospitals' Component={AssociateHospitals} />
      <Route path='deleteasshospital' Component={DeleteAssHospitals}/>
    </Route>
    <Route path='/reset/:email' Component={ResetPassword}/>
    
    <Route path='*' Component={NoPage} />
        
    </Routes>
        
    
  )
}

export default Routing
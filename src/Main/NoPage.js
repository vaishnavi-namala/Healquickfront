import React from 'react'
import nopage from "./NoPage.module.css"
import { Link } from 'react-router'

const NoPage = () => {
  return (
    <div className={nopage.container}> 
      <div className={nopage.head}>
       <Link to='/' > <h1>HEAL QUICK</h1></Link>
      </div>
      <div className={nopage.main}>
        <div>
        <h1>404 – Page Not Found</h1>
        <h2>Oops! Looks like this page needs a little healing of its own.</h2>
        <p>But don’t worry—your wellness journey doesn’t stop here.</p>
          <p className='mb-5'>Browse our resources, products, or contact us if you need assistance.</p>
          <Link to='/' >Go To HomePage</Link>
          </div>
        </div>
    </div>
  )
}

export default NoPage
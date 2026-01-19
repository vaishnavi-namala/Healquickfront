import React from 'react'
import dash from './Dashboard.module.css'

const Header = () => {
  return (
    <div className={`container-fluid ${dash.con }`}>
        <h1 className='mx-5'>Welcome to user</h1>
    </div>
  )
}

export default Header
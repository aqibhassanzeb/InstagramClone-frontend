import React from 'react'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
   
       <div  style={{textAlign:'center'}}>
    <p style={{color:'red'}}>Click to route to "/oops" which isn't a registered route:</p>
    <Link to="/">Let's go</Link>
  </div>
       
  )
}

export default Pagenotfound
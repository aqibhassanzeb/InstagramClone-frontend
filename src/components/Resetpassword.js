import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'


const Resetpassword = () => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const resetPassword = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      toast("Invalid email !");
      return
    }
    fetch('/reset-password', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error) {
          toast(data.error)
        } else {
          toast(data.message)
          navigate('/login')
        }
      }).catch(err => console.log(err))
  }

  return (
    <>

      <ToastContainer />
      <div className='loginfulldiv' style={{ marginTop: '100px' }} >
        <div className='card cardfulldivlogin mt-3' style={{ width: '40%', height: "50vh", textAlign: "center" }}>
          <h2 style={{ padding: '30px' }} className="cardtextlogin">
            Instagram
          </h2>
          <div style={{ justifyContent: 'center' }}>

            <input className='inputtextlogin ' type="text" placeholder='Email..'
              onChange={(e) => setEmail(e.target.value)} value={email}
            />
            <br />

          </div>
          <div style={{ paddingTop: "20px" }}>
            <button className='btn-primary btnlogin'
              onClick={() => resetPassword()}
            >Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Resetpassword
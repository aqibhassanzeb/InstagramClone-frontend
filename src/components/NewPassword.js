import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams} from 'react-router-dom'
import './Login.css'

const NewPassword= () => {

   const {token}= useParams()
//    console.log(token)

const [password, setPassword] = useState('')
 const navigate=useNavigate()

const updatePassHandle=()=>{
  
  fetch('http://localhost:5000/new-password',{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      password,
      token
    })
  }).then(res=>res.json())
  .then(data=>{console.log(data)
  if(data.error){
    toast(data.error)
  } else{
    toast(data.message)
    navigate('/login')
  }
}).catch(err=>console.log(err))
}

  return (
    <div className='loginfulldiv' style={{marginTop:'100px'}} >
      <ToastContainer />
      <div className='card cardfulldivlogin mt-3'  style={{width:'40%',height:"50vh" ,textAlign:"center"}}>
        <h2 style={{padding:'30px'}} className="cardtextlogin">
          Instagram
        </h2>
        <div  style={{justifyContent:'center'}}>
        <br/>
        <input className='inputtextlogin mt-3' type="text" placeholder='enter new password...'
        onChange={(e)=>setPassword(e.target.value)} value={password}
        />
        </div>
        <div style={{paddingTop:"20px"}}>
          <button className='btn-primary ' 
          onClick={()=>updatePassHandle()}
          >Update Password</button>
        </div>
      </div>
    </div>
  )
}

export default NewPassword

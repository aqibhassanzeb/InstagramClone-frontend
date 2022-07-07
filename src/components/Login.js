import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'
import { useDispatch } from 'react-redux';
import { setActiveUser } from '../redux/features/userSlice';

const Login = () => {
const dispatch = useDispatch()
 
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
 const navigate=useNavigate()

const loginHandle=()=>{
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    toast("Invalid email !");
    return
    }
  fetch('http://localhost:5000/signin',{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email,
      password
    })
  }).then(res=>res.json())
  .then(data=>{console.log(data)
  if(data.error){
    toast(data.error)
  } else{
    localStorage.setItem('jwt',data.token)
    localStorage.setItem('userDetail',JSON.stringify(data.user))
    dispatch(setActiveUser(data.user))
    toast(data.message)
    navigate('/')
  }
}).catch(err=>console.log(err))
}


const ressuccessGoogle=(res)=>{
    console.log(res)
    fetch('http://localhost:5000/signinwithg',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
       tokenId:res.tokenId
      })
    }).then(res=>res.json())
    .then(data=>{console.log(data)
    if(data.error){
      toast(data.error)
    } else{
      localStorage.setItem('jwt',data.token)
      localStorage.setItem('userDetail',JSON.stringify(data.user))
      dispatch(setActiveUser(data.user))
      toast(data.message)
      navigate('/')
    }
  }).catch(err=>console.log(err))
      
    

  }
  const reserrorGoogle=(res)=>{
    console.log(res)
  }

  return (
    <div className='loginfulldiv' style={{marginTop:'100px'}} >
      <ToastContainer />
      <div className='card cardfulldivlogin mt-3'  style={{width:'40%',height:"60vh" ,textAlign:"center"}}>
        <h2 style={{padding:'30px'}} className="cardtextlogin">
          Instagram
        </h2>
        <div  style={{justifyContent:'center'}}>

        <input className='inputtextlogin ' type="text" placeholder='Email..'
        onChange={(e)=>setEmail(e.target.value)} value={email}
        />
        <br/>
        <input className='inputtextlogin mt-3' type="text" placeholder='password...'
        onChange={(e)=>setPassword(e.target.value)} value={password}
        />
        </div>
        <li style={{listStyleType:'none',paddingTop:'10px'}}><Link to='/reset'>forgit password</Link> <br/> if you haven't account <Link to='/signup'>Signup</Link></li>
        <div style={{paddingTop:"20px"}}>
          <button className='btn-primary btnlogin' 
          onClick={()=>loginHandle()}
          >Signin</button>
        </div>
        <div className='mt-3'>

        <GoogleLogin
    clientId="1021784210660-04ov682sojbq371pj4nle67s5c5ljuav.apps.googleusercontent.com"
    buttonText="SigIn with Google"
    onSuccess={ressuccessGoogle}
    onFailure={reserrorGoogle}
    cookiePolicy={'single_host_origin'}
    scope="profile"
    
    />
    </div>
      </div>
    </div>
  )
}

export default Login
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

const Signup = () => {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [image, setImage] = useState('')
const [url, setUrl] = useState(undefined)
 const navigate=useNavigate()

 useEffect(() => {
  if(url){
    upleadFields()
  }
 }, [url])

 const upleadPic=()=>{
  const data = new FormData();
  data.append('file', image);
data.append("upload_preset", "instagramprac");
data.append("cloud_name","dbdxsvxda")

  fetch("https://api.cloudinary.com/v1_1/dbdxsvxda/image/upload",{
  method:"post",
  body:data
  })
  .then(res=>res.json())
  .then(data=>{
   setUrl(data.url)
  }).catch(err=>{
    console.log(err)
  })
 }
  const upleadFields=()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      toast("Invalid email !");
      return
      }
    fetch('http://localhost:5000/signup',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password,
        pic:url
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

const signupHandle=()=>{
  if(image){
    upleadPic()
  }else{
    upleadFields()
  }

 
}
  return (
    <div className='loginfulldiv' style={{marginTop:'100px'}}>
      <ToastContainer />
    <div className='card cardfulldivlogin mt-3'  style={{width:'40%',height:"50vh" ,textAlign:"center"}}>
      <h2 style={{padding:'30px'}} className="cardtextlogin">
        Instagram
      </h2>
      <div  style={{justifyContent:'center'}}>

      <input className='inputtextlogin ' type="text" placeholder='Name...'
      onChange={(e)=>setName(e.target.value)} value={name}
      />
      <input className='inputtextlogin mt-3 ' type="email" placeholder='Email..'
      onChange={(e)=>setEmail(e.target.value)} value={email}
      />
      <br/>
      <input className='inputtextlogin mt-3' type="text" placeholder='password...'
      onChange={(e)=>setPassword(e.target.value)} value={password}
      />
      <div className=''>
        {/* <span className='btn-primary'>IMAGE UPLOAD</span> */}
        <input className='mt-3' type="file"  onChange={(e)=>setImage(e.target.files[0])}/>

        </div>
      </div>
      <div style={{paddingTop:"10px"}}>
        <button className='btn-primary btnlogin' onClick={signupHandle}>Signup</button>
      </div>
    </div>
  </div>
  )
}

export default Signup
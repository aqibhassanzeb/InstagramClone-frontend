import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import './CreatePost.css'


const CreatePost = () => {
const [title, setTitle] = useState('')
const [body, setBody] = useState('')
const [image, setImage] = useState('')
const [url, setUrl] = useState('')
const navigate=useNavigate()

useEffect(() => {
  if(url){

    fetch('http://localhost:5000/createpost',{
      method:"post",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      title,
      body,
      pic:url
    })
  }).then(res=>res.json())
  .then(data=>{console.log(data)
    if(data.error){
      toast(data.error)
    } else{
      toast(data.message)
      navigate('/')
    }
  }).catch(err=>console.log(err))
  
}
}, [url])



const postSubmitHandle=()=>{
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

  return (
    <div className='loginfulldiv'style={{marginTop:'100px'}} >
      <ToastContainer />
      <div className='card cardfulldivlogin mt-3'  style={{width:'40%',height:"50vh" ,textAlign:"center"}}>
        
        <div  style={{justifyContent:'center'}}>

        <input className='inputtextcreatepost mt-3 ' type="text" placeholder='title'
        onChange={(e)=>setTitle(e.target.value)}
        />
        <br/>
        <input className='inputtextcreatepost mt-3' type="text" placeholder='body'
         onChange={(e)=>setBody(e.target.value)}
        />
        <div className='imageuploadtextfieldcreatepost'>
        {/* <span className='btn-primary'>IMAGE UPLOAD</span> */}
        <input className='mt-3' type="file"  onChange={(e)=>setImage(e.target.files[0])}/>

        </div>
        </div>
        <div style={{paddingTop:"40px"}}>
          <button className='btn-primary ' onClick={postSubmitHandle}>SUBMIT POST</button>
        </div>
      </div>
    </div>
        // onClick={(e)=>console.log(e.target.files)}
  )
}

export default CreatePost
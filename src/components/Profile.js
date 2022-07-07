import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  setActiveUser } from '../redux/features/userSlice'

import './Profile.css'

const Profile = () => {
  const user = useSelector(state => state.user.activeUser)
  
//  const updateuser=useSelector(state=>state.user.pic)
 console.log(user)
  const [data, setData] = useState()
  const [image, setImage] = useState('')
  console.log(image)
const [url, setUrl] = useState('')
const  dispatch=useDispatch()
  useEffect(() => {
 
    fetch('/mypost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }  
    }).then(res=>res.json())
      .then(result=>{
       
        setData(result)
      })
    
  }, [])

  useEffect(()=>{
    if(image){
     const data = new FormData()
     data.append('file', image);
     data.append("upload_preset", "instagramprac");
     data.append("cloud_name","dbdxsvxda")
     
       fetch("https://api.cloudinary.com/v1_1/dbdxsvxda/image/upload",{
         method:"post",
         body:data
     })
     .then(res=>res.json())
     .then(data=>{
 
    
        fetch('http://localhost:5000/updatepic',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                pic:data.url
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            localStorage.setItem("userDetail",JSON.stringify({...user,pic:result.pic}))
            dispatch(setActiveUser({pic:result.pic}))
            // dispatch({type:"UPDATEPIC",payload:result.pic})
            //window.location.reload()
        })
    
     })
     .catch(err=>{
         console.log(err)
     })
    }
 },[image])
  const updatePic=(file)=>{
    setImage(file)
    
  }

  return (
    <div className='container' style={{marginTop:'100px'}}>
      {console.log(user&&user.pic)}
      <div className='row'>

      <div className=' col-md-6 col-sm-6 col-xs-12 imagedivprofile' >
    <img  style={{height:'200px',width:'200px',borderRadius:'50%'}}
    src={user?user.pic:'loading'}
    />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12 namepostdivprofile'>
      
      <h2>{user?user.name:'loading'}</h2>
      <br/>
      <div className='postsfollowersdivprofile'>

      <h6 style={{margin:'5px'}}>40 posts</h6>
      <h6 style={{margin:'5px'}}>40 followers</h6>
      <h6 style={{margin:'5px'}}>40 following</h6>
      </div>
      </div>
      <div className='imageuploadtextfieldcreatepost'>
        {/* <span className='btn-primary'>IMAGE UPLOAD</span> */}
        <input className='mt-3' type="file"  onChange={(e)=>updatePic(e.target.files[0])}/>

        </div>
    </div>
    <hr/>
    <div className='row'>
      {
       data&& data.map((elem)=>{
          return(
           <div key={elem._id} style={{textAlign:'center'}}  className=' col-md-3 col-sm-4 col-xs-12 mt-4'> 
    <div  >
    <img alt={elem.title} style={{height:'200px',width:'200px'}}
    src={elem.photo}
    />
</div>
    </div>
     

          )
        })
      }
    </div>
    </div>
  )
}

export default Profile
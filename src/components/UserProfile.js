import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {setActiveUserUpdate } from '../redux/features/userSlice'
import './Profile.css'

const UserProfile = () => {
  const user = useSelector(state => state.user.updateactiveUser)
  console.log(user)
//   user?!user.following.includes(userId):
  const {userId}= useParams()
    // console.log(userId)
  const [userProfile, setUserProfile] = useState('')
  const [showfollow,setShowFollow] = useState(true)
//   console.log(user.following.includes(userId))
   const dispatch=useDispatch()
  useEffect(() => {
 
    fetch(`/user/${userId}`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }  
    }).then(res=>res.json())
      .then(result=>{
          setUserProfile(result)
    //    console.log(result)
      })
    
  }, [])

  const followUser = ()=>{
    fetch('http://localhost:5000/follow',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            followId:userId
        })
    }).then(res=>res.json())
    .then(data=>{
    console.log(data)
        // dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            dispatch(setActiveUserUpdate({following:data.following,followers:data.followers}))
         localStorage.setItem("user",JSON.stringify(data))
         setUserProfile((prevState)=>{
             return {
                 ...prevState,
                 user:{
                     ...prevState.user,
                     followers:[...prevState.user.followers,data._id]
                    }
             }
         })
         setShowFollow(false)
    })
}
const unfollowUser = ()=>{
    fetch('http://localhost:5000/unfollow',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            unfollowId:userId
        })
    }).then(res=>res.json())
    .then(data=>{
        
        dispatch(setActiveUserUpdate({following:data.following,followers:data.followers}))
        localStorage.setItem("user",JSON.stringify(data))
        
         setUserProfile((prevState)=>{
            const newFollower = prevState.user.followers.filter(item=>item != data._id )
             return {
                 ...prevState,
                 user:{
                     ...prevState.user,
                     followers:newFollower
                    }
             }
         })
         setShowFollow(true)
         
    })
}

  return (
      < div style={{marginTop:'100px'}}>
      {userProfile? 
    <div className='container' style={{marginTop:'100px'}}>
      <div className='row'>

      <div className=' col-md-6 col-sm-6 col-xs-12 imagedivprofile' >
    <img  style={{height:'200px',width:'200px',borderRadius:'50%'}}
    src={userProfile.user.pic}
    />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12 namepostdivprofile'>
      
      <h2>{userProfile.user.name}</h2>
      <h4>{userProfile.user.email}</h4>
      <br/>
      <div className='postsfollowersdivprofile'>

      <h6 style={{margin:'5px'}}>{userProfile.posts.length} posts</h6>
      <h6 style={{margin:'5px'}}>40 followers</h6>
      <h6 style={{margin:'5px'}}>40 following</h6>
      </div>
      { showfollow?
          <div>
          <button className='btn-primary' onClick={()=>followUser()}> Follow</button>
      </div>
      :
      <div>
          <button className='btn-primary' onClick={()=>followUser()}> Follow</button>
      </div>
      }
      </div>
    </div>
    <hr/>
    <div className='row'>
      {
    userProfile.posts.map((elem)=>{
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
    : <h1>Loading.....</h1> }
    </div>
  )
}

export default UserProfile
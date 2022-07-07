import React, { useEffect, useState } from 'react'
import "./Home.css"
import { AiFillDelete, AiOutlineHeart } from 'react-icons/ai';
import { FiThumbsDown, FiThumbsUp} from 'react-icons/fi'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([])
const [comments, setComments] = useState([])
  const user=useSelector(state=>state.user.activeUser)
//  console.log(user)

useEffect(() => {
 
  fetch('http://localhost:5000/allpost',{
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }  
  }).then(res=>res.json())
    .then(result=>{
    //  console.log(result)
      setData(result.posts)
    })
  
}, [])
const likePost=(id)=>{
  console.log(id)
  fetch('http://localhost:5000/like',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postedBy:id
    })
  }).then(res=>res.json())
    .then(result=>{
    //  console.log("post result",result)
     const newdata=data.map((elem)=>{
        if(elem._id==result._id){
          return result
        } else{
          return elem
        }
      })
      setData(newdata)
    }).catch(err=>console.log(err))
}
const UnlikePost=(id)=>{
  fetch('http://localhost:5000/unlike',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postedBy:id
    })
  }).then(res=>res.json())
    .then(result=>{
    //  console.log("post result",result)
     const newdata= data.map((elem)=>{
      if(elem._id==result._id){
        return result
      } else{
        return elem
      }
    })
    setData(newdata)
    }).catch(err=>{
      console.log(err)
    })
}
  const makeComment=(id)=>{
    console.log(id)
    fetch('http://localhost:5000/comment',{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          postedBy:id,
          text:comments
      })
  }).then(res=>res.json())
  .then(result=>{
      console.log(result)
      const newData = data.map(item=>{
        if(item._id==result._id){
            return result
        }else{
            return item
        }
     })
    setData(newData)
    setComments('')
  }).catch(err=>{
      console.log(err)
  })

  }

  const deletePost=(postId)=>{
    fetch(`http://localhost:5000/deletepost/${postId}`,{
      method:"delete",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
        // window.location.reload(false);
    })
  }


  return (
    <div style={{marginTop:'100px'}}>
       {
     data&& data.map((elem)=>{
        return(
          <div key={elem._id}>
           

      <div className='cardfulldivhome'>
      <Card  className="carddivhome mt-4" >
        <Card.Text>
         
      <Link style={{textDecoration:'none',color:'black',fontSize:'large',fontWeight:'bold'}}
       to={elem.postedBy._id !== user._id? `/profile/${elem.postedBy._id}`:'/profile'}> 
          {elem.postedBy.name}
      </Link>  
        
         {
           elem.postedBy._id===user._id &&
         
         <i className='hearticonhome' onClick={()=>deletePost(elem._id)} >
      <AiFillDelete style={{fontSize:'20px',margin:'5px'}} />
    </i>
        }
        </Card.Text>
  <Card.Img variant="top" src={elem.photo} />
  <Card.Body>
    <i className='hearticonhome'>
      <AiOutlineHeart style={{fontSize:'25px'}} />
    </i>
    {
    elem.likes.includes(user._id) ?

    <i className='hearticonhome' onClick={()=>UnlikePost(elem._id)} >
      <FiThumbsDown style={{fontSize:'20px',margin:'5px'}} />
    </i>
    :
    <i className='hearticonhome'  onClick={()=>likePost(elem._id)} >
      <FiThumbsUp style={{fontSize:'20px',margin:'5px'}} />
    </i> 

   }
    <h6>{elem.likes.length} likes</h6>
    
    <Card.Title>{elem.title}</Card.Title>
    <Card.Text>
      {elem.body}
      <br/>
      <hr/>
      <div style={{textDecoration:'underline'}}>
        Commants Section
        </div>
      {elem.comments.map((comm)=>{
       
        return(
          <h6 style={{fontWeight:'bold',textTransform:"capitalize"}}>{comm.postedBy.name? comm.postedBy.name:'loading..'} : <span style={{fontWeight:"normal",textTransform:'none'}}>{comm.text}</span></h6>

        )
      })}
    </Card.Text>
    <form onSubmit={(e)=>{
      e.preventDefault();
      makeComment(elem._id);
      // makeComment(e.target[0].value,item._id)
      console.log('this is comment submit console')
      
    }}>
    <input className='inputhomecard' value={comments} onChange={(e)=>setComments(e.target.value)} placeholder='comments.....' />

    </form>
    {/* <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form> */}
  </Card.Body>
</Card>
          </div>
      </div>
          )
        })
      }
     
    </div>
  )
}

export default Home
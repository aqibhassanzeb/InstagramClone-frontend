import React from 'react'
import {Navbar,Container,Nav,} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setLogout } from '../redux/features/userSlice'
const NavbarClass = () => {
  const dispatch=useDispatch()
  const user = useSelector(state => state.user.activeUser)
  const navigate=useNavigate()
  const logoutHandle=()=>{
  localStorage.removeItem("userDetail")
  localStorage.removeItem("jwt")
  navigate('/login')
  // window.location.reload(false);
  dispatch(setLogout())
//  navigate('/login')
}

const renderList=()=>{
  if(user){
    return[
<Nav.Link  ><Link style={{textDecoration:"none"}} to="/profile"><i>Profile</i></Link></Nav.Link>,
      <Nav.Link ><Link style={{textDecoration:"none"}} to="/createpost"><i>Createpost</i></Link></Nav.Link>,
      <button className='btn-danger' onClick={logoutHandle}>LogOut</button>
] 
  }
   else{
    return[
<Nav.Link ><Link style={{textDecoration:"none"}} to="/login"><i>Signin</i></Link></Nav.Link>,
      <Nav.Link ><Link style={{textDecoration:"none"}} to="/signup"><i>Signup</i></Link></Nav.Link>
    ]
  }   
    }

  return (
    <div >
<Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed='top'  className='container shadow p-3  bg-body rounded'>
  <Container>
  <Navbar.Brand className='navbarlogo' >Instagram</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
   
    <Nav className="ms-auto">
    { user&&<Nav.Link ><Link style={{textDecoration:"none"}} to={user?"/":"login"}><i>Home</i></Link></Nav.Link>
    }
      {renderList()}
    
     
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

    </div>
  )
}

export default NavbarClass
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import CreatePost from './components/CreatePost'
import Home from './components/Home'
import Login from './components/Login'
import NewPassword from './components/NewPassword'
import Pagenotfound from './components/Pagenotfound'
import Profile from './components/Profile'
import Resetpassword from './components/Resetpassword'
import Signup from './components/Signup'
import UserProfile from './components/UserProfile'
import { setActiveUser } from './redux/features/userSlice'

const RoutesClass = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const userData = useSelector(state => state.user.activeUser)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetail"))
    if (user) {
      dispatch(setActiveUser(user))

    } else {
      if (location.pathname.startsWith('/reset')) {
        if (location.pathname === '/reset') {
          navigate('/reset')
        } else {
          <NewPassword />
        }
      } else {

        navigate('/login')
      }
    }

  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' exact element={<Profile />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/profile/:userId' element={<UserProfile />} />
        <Route path='/reset' exact element={<Resetpassword />} />
        <Route path='/reset/:token' element={<NewPassword />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>

    </div>
  )
}

export default RoutesClass
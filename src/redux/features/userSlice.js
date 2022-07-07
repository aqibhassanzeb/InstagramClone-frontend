import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeUser:null,
    // updateactiveUser:null
    pic:null
  }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setActiveUser: (state,action) =>{
          state.activeUser = action.payload
      
        },
        updatepic:(state, action)=>{
          state.pic=action.payload
          },
        // setActiveUserUpdate:(state,action)=>{
        //   state.updateactiveUser=action.payload
        // },
        setLogout:(state)=>{
            state.activeUser=null
           
        }
    
    
  }
});

export const {setActiveUser,setLogout,setActiveUserUpdate,updatepic} = userSlice.actions

export default userSlice.reducer




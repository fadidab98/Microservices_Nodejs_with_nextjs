import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next';



const initialState={
    login:{
        name:"",
        email:"",
        mobile:"",
        password:"",
       


    }
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        changeEmail:(state,action)=>{
            state.login.email = action.payload;

        },
        changePassword:(state,action)=>{
            state.login.password = action.payload;

        },
        setCsrf:(state,action)=>{
            state.setting.csrf = action.payload;

        },
       
    }
})



const { actions, reducer } = loginSlice;
export const {changeEmail,changePassword,setCsrf} = actions;
export default reducer
import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next';



const initialState={
    setting:{
        loading:false,
        loadingButton:false,
        csrf:"",
        socket:null,
        cookies:null,
        toggle:false,
        slideButton:false,
        socketBazaar:null,
        bazaarStart:false,
        postId:0

       


    }
}

export const settingSlice = createSlice({
    name:'setting',
    initialState,
    reducers:{
        changeLoading:(state,action)=>{
            state.setting.loading = !action.payload;

        },
        changeLoadingButton:(state,action)=>{
            state.setting.loadingButton = !action.payload;

        },
        setCsrf:(state,action)=>{
            state.setting.csrf = action.payload;

        },
        changeSocket:(state,action)=>{
            state.setting.socket = action.payload;

        },
        changeCookies:(state,action)=>{
            state.setting.cookies = action.payload;

        },
        changeTogle:(state,action)=>{
            state.setting.toggle=!action.payload       
        },
        changeSlideButton:(state,action)=>{
            const { key, value } = action.payload;
            state.setting[key] = !value;
        },
        changeSocketBazaar:(state,action)=>{
            state.setting.socketBazaar = action.payload;

        },
        changeBazaarStart:(state,action)=>{
            state.setting.bazaarStart= !action.payload
        },
        setPostId:(state,action)=>{
            state.setting.postId= action.payload
        }
    }
})



const { actions, reducer } = settingSlice;
export const {changeBazaarStart,setPostId,changeSlideButton,changeLoadingButton,changeLoading,setCsrf,changeSocket,changeCookies,changeTogle,changeSocketBazaar} = actions;
export default reducer
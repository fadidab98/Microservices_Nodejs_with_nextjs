import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next';



const initialState={
    house:{
    sale_status:"",
        type:"",
        status:"",
        category:"",
        price:"",
        location:"",
        kitchen:"",
        salon:"",
        bedroom:"",
        bathroom:"",
        garden:"",
        floor:"",
        userId:"",
        email:"",
        title:"",
        ar_description:"",
        ar_title:"", 


    }
}

export const settingSlice = createSlice({
    name:'house',
    initialState,
    reducers:{
        updateInputState: (state, action) => {

            const { key, value } = action.payload;
            state.house[key] = value;
            console.log("key :",key,"value :",value)
          },
          ChangeInput:(state, action)=>{
            const { key, value } = action.payload;
            state.house.title = action.payload.value;
          }
       
    }
})



const { actions, reducer } = settingSlice;
export const {updateInputState,ChangeInput} = actions;
export default reducer
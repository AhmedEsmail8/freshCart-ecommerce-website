import { createSlice } from "@reduxjs/toolkit";


export const themeSlice = createSlice({
    name: 'theme',
    initialState:{
        theme: ''
    },
    reducers:{
        setTheme: (state, action)=>{
            state.theme = action.payload;
        }
    }
})

export let themeReducer = themeSlice.reducer;
export let {setTheme} = themeSlice.actions;
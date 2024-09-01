import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLogged: false,
    resetEmail: null,
    codeEntered: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signin: (state)=>{
            state.isLogged = true;
        },

        signout: (state)=>{
            state.isLogged = false;
        },

        removeResetEmail: (state)=>{
            state.resetEmail = null
        },

        setResetEmail: (state, action)=>{
            state.resetEmail = action.payload;
        },

        setCode: (state)=>{
            state.codeEntered = true;
        },

        resetCode: (state)=>{
            state.codeEntered = false
        }
    }
})


export let {signin, signout, removeResetEmail, setResetEmail, setCode, resetCode} = userSlice.actions;
export let userReducer = userSlice.reducer;
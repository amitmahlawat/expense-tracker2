import { createSlice,configureStore } from "@reduxjs/toolkit";

const initialState = {darkTheme:false}
const ThemeSlice = createSlice({
    name:"theme",
    initialState: initialState,
    reducers:{
        ApplyDarkTheme(state){
            state.darkTheme=!state.darkTheme
            // console.log(state.darkTheme)
        },
        // ApplyWhiteTheme(state){
        //     state.darkTheme=false
        // }
    }
})

export const ThemeActions = ThemeSlice.actions




export default ThemeSlice.reducer
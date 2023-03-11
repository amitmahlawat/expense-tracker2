import { legacy_createStore } from "redux";
import { createSlice,configureStore } from "@reduxjs/toolkit";

const token = localStorage.getItem('token')
const initialauthState={isLoggedIn:!!token}

const AuthSlice=createSlice({
    name:'authentication',
    initialState: initialauthState,
    reducers:{
        Login(state){
            state.isLoggedIn=true
        },
        LogOut(state){
            state.isLoggedIn=false
        }
    }
})

const initialExpense={Expenses:[],totalAmount:0}
const ExpenseSlice = createSlice({
    name:'Expenses',
    initialState:initialExpense,
    reducers:{
        AddExpense(state,action){
            state.Expenses.unshift(action.payload)
        },
        DeleteExpense(state,action){
            const existing=state.Expenses.findIndex(data=>{
                return data.key===action.payload.key
            })
            state.Expenses.splice(existing,1)
        },
        FetchExpense(state,action){
            state.Expenses=action.payload
        },
        AddAmount(state,action){
            state.totalAmount=state.totalAmount+action.payload
        },
        SubAmount(state,action){
            state.totalAmount=state.totalAmount-action.payload
        }
    }
})
export const ExpenseActions=ExpenseSlice.actions;
export const authActions=AuthSlice.actions;
const Store = configureStore({reducer:{AuthReducer: AuthSlice.reducer,ExpenseReducer:ExpenseSlice.reducer}})

















export default Store;
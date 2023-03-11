import React, { useEffect } from "react";
import './ExpenseForm.css'
import { useRef,useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { ExpenseActions } from "./store/index";
import { useSelector,useDispatch } from "react-redux";
import { ThemeActions } from "./store/theme";
const ExpenseForm=()=>{
    const dataFetchedRef = useRef(false)
    const Expense = useSelector(state=>state.ExpenseReducer.Expenses)
    const totalAmount = useSelector(state=>state.ExpenseReducer.totalAmount)
    const darkTheme = useSelector(state=>state.ThemeReducer.darkTheme)
    const dispatch = useDispatch()
    const AmountRef=useRef();
    const DescriptionRef=useRef();
    const CategoryRef=useRef();

    const FetchExpenseHandler=async()=>{
        const email=localStorage.getItem('Email')
        const Email=email.replace('@','').replace(".",'')
            const response=await fetch(`https://expense-tracker-10a49-default-rtdb.firebaseio.com/expenses/${Email}.json/`,)
                if(!response.ok){
                    throw new Error('something went wrong')
                }
                const data=await response.json()
                // console.log(data)
                const loadedExpense=[]
                
                for(const key in data){
                    dispatch(ExpenseActions.AddAmount(Number(data[key].Amount)))
                    loadedExpense.unshift({
                        key:key,
                       Amount:data[key].Amount,
                       Category:data[key].Category,
                       Description:data[key].Description,
                       
                       
                    })
                    
                }
                // let amount=0
                // loadedExpense.map((item)=>{
                //     amount+=item.Amount
                // })
                // dispatch(ExpenseActions.AddAmount(Number(amount)))
                dispatch(ExpenseActions.FetchExpense(loadedExpense))
                
                    
            
    }
    console.log(totalAmount)
    useEffect(()=>{
        if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
        FetchExpenseHandler()
    },[])
    
    const SubmitHandler=async(e)=>{
        e.preventDefault();
        console.log(totalAmount)
        const EnteredExpense={
            Amount:AmountRef.current.value,
            Description:DescriptionRef.current.value,
            Category:CategoryRef.current.value
        }
        dispatch(ExpenseActions.AddAmount(Number(EnteredExpense.Amount)))
        console.log(totalAmount)
        // dispatch(ExpenseActions.AddAmount(Amount))
        // console.log(Amount)
        const email=localStorage.getItem('Email')
            const Email=email.replace('@','').replace(".",'')
        const response=await fetch(`https://expense-tracker-10a49-default-rtdb.firebaseio.com/expenses/${Email}.json`,{
            method:"POST",
            body:JSON.stringify(EnteredExpense),
                Headers:{
                'Content-Type':"application/json"
                }
        })
        const data=await response.json()
        console.log(data)
        dispatch(ExpenseActions.AddExpense({...EnteredExpense,key:data.name}))
        AmountRef.current.value=''
        DescriptionRef.current.value=''
        CategoryRef.current.value=''
        // FetchExpenseHandler()
    }
    const EditHandler=async(item)=>{
        AmountRef.current.value=item.Amount
        DescriptionRef.current.value=item.Description
        CategoryRef.current.value=item.Category
        const response=await fetch(`https://expense-tracker-10a49-default-rtdb.firebaseio.com/expenses/${item.key}.json`,{
        method:'DELETE',
        body:null,
        headers:{
            'Content-type':'application/json'
          }
    })
    const data=await response.json();
    }
    const ThemeHandler = ()=>{
        dispatch(ThemeActions.ApplyDarkTheme())
        console.log('premium button clicked')
    }


    // const myJson=JSON.stringify(Expense)
        
    
        const blob=new Blob(Expense.map((item)=>JSON.stringify(item)))
        const href=URL.createObjectURL(blob)
    
    
    
    
    
    
    return(
        <div  style={{width:"500px",margin:"auto"}}>
        <h2 style={{textAlign:"center",marginTop:"15vh"}}>Add your Expense</h2>
        <form onSubmit={SubmitHandler} className="input" style={{backgroundColor:"rgb(0,0,150)",paddingLeft:"20px",textAlign:"center" , borderStyle:"solid" , borderRadius:"20px",borderWidth:"5px" ,marginTop:"5px"}}>
            
            <label className="label" htmlFor="amount">Amount</label>
            <input style={{width:"250px",borderRadius:"5px"}} className="input" id="amount" type="number" ref={AmountRef} ></input><br/>
            <label className="label" htmlFor="description">Description</label>
            <input style={{width:"250px",borderRadius:"5px"}} className="input" id="description" type="text" ref={DescriptionRef}></input><br/>
            <label className="label" htmlFor="category">Category</label>
            <select style={{width:"250px",borderRadius:"5px"}} id="category" className="input"  ref={CategoryRef}>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Movie">Movie</option>
                <option value="Medicines">Medicines</option>
                <option value="Travel">Travel</option>
            </select><br/>
            <input className="input" style={{marginTop:"5px"}} type="submit"></input>
           
        </form>
        {totalAmount>10000 &&<button onClick={ThemeHandler} style={{background:"orange",height:"30px",marginLeft:"5px"}}>Activate Premium</button>}
        <a download='file.csv' href={href} style={{height:"30px",marginLeft:"5px",marginLeft:"34%"}}>Download ExpenseList</a>
        <ExpenseItem fetch={FetchExpenseHandler} Edit={EditHandler} Items={Expense}></ExpenseItem>
        </div>



    )
};

export default ExpenseForm;
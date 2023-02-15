import React from "react";
import './ExpenseForm.css'
import { useRef,useState } from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseForm=()=>{
    const[Items,SetItems]=useState([]);
    const AmountRef=useRef();
    const DescriptionRef=useRef();
    const CategoryRef=useRef();
    
    const SubmitHandler=(e)=>{
        e.preventDefault();
        const EnteredExpense={
            Amount:AmountRef.current.value,
            Description:DescriptionRef.current.value,
            Category:CategoryRef.current.value
        }
        SetItems([...Items,EnteredExpense])
        console.log(Items)
    }
    
    
    
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
        <ExpenseItem Items={Items}></ExpenseItem>
        </div>



    )
};

export default ExpenseForm;
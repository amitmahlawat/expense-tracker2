import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { ExpenseActions } from "./store";
const ExpenseItem = (props) => {
  const Items = props.Items;
  
  const Expense = useSelector(state=>state.ExpenseReducer.Expenses)
  const totalAmount = useSelector(state=>state.ExpenseReducer.totalAmount)
  const dispatch = useDispatch()

  
console.log(Items)
  const DeleteHandler = async (item) => {
    dispatch(ExpenseActions.DeleteExpense(item))
    dispatch(ExpenseActions.SubAmount(Number(item.Amount)))
    console.log(totalAmount)
    const email=localStorage.getItem('Email')
        const Email=email.replace('@','').replace(".",'')
    const response = await fetch(
      `https://expense-tracker-10a49-default-rtdb.firebaseio.com/expenses/${Email}/${item.key}.json`,
      {
        method: "DELETE",
        body: null,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    // props.fetch()
  };
  const EditHandler = (item) => {
    props.Edit(item);
  };

  

  return Items.map((item) => (
    
        <div
      style={{
        borderStyle: "solid",
        borderRadius: "15px",
        borderColor: "black",
        backgroundColor: "rgb(0,100,100)",
        color: "white",
        margin: "5px",
        borderWidth: "5px",
      }}
    >
        
      <h2 style={{ marginBottom: "2px", display: "inline" }}>
        {item.Category}
      </h2>
      <p style={{ textAlign: "center", marginBottom: "2px", fontSize: "40px" }}>
        {item.Description}
      </p>
      <h3 style={{ textAlign: "end", marginBottom: "2px" }}>${item.Amount}</h3>
      <button
        onClick={() => EditHandler(item)}
        style={{ background: "orange", borderRadius: "5px", float: "left" }}
      >
        Edit
      </button>
      <button
        onClick={() => DeleteHandler(item)}
        style={{ background: "orange", borderRadius: "5px", marginLeft: "5px" }}
      >
        Delete
      </button>
    </div>
    
  ));
};

export default ExpenseItem;

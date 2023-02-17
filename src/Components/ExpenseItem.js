import React from "react";


const ExpenseItem=(props)=>{

const Items=props.Items
console.log(Items)
    return(
        Items.map(item=>
            
            <div style={{borderStyle:"solid",borderRadius:"8px",borderColor:"black",backgroundColor:"rgb(0,100,100)",color:"white",margin:"5px",borderWidth:"5px"}}>
           
            <h2 style={{marginBottom:"2px",display:"inline"}}>{item.Category}</h2>
           <p style={{textAlign:"center",marginBottom:"2px",fontSize:"40px"}}>{item.Description}</p>
            <h3 style={{textAlign:'end',marginBottom:"2px"}}>${item.Amount}</h3>
            
        </div>
        
        )
        
        
    )
}


export default ExpenseItem;
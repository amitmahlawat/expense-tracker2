
import React, { useState } from "react";


const AuthContext=React.createContext({
    token:'',
    isLoggedIn:'false',
    login:()=>{},
    logout:()=>{}
})




export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token')
    const[token,setToken]=useState(initialToken)
    const  userisLoggedIn=!!token
    
  
    const loginHandler=(token)=>{
        
        setToken(token)
        localStorage.setItem('token',token);
            
    }
    const logoutHandler=()=>{
        setToken(null)
        localStorage.clear()
        console.log('click')
    }
  
  
  
  
  
  
  
 const contextValue={
        token:token,
        isLoggedIn:userisLoggedIn,
        login:loginHandler,
        logout:logoutHandler
}

return (
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
)
}

export default AuthContext;
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const  myContext = createContext()
const Authcontext = ({children }) => {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    const [isLogin, setisLogin] = useState(false)
   const test = "tanzil"
   const token =  localStorage.getItem("accessToken")
   console.log(token);
   

   useEffect(() => {
    if (token || isLogin) {
      axios
        .post(`https://user-verify-server.vercel.app/auth/user-info`, { token })
        .then((res) => {
          if (res.data.message === "successfull") {
            setuser(res.data.data);
            setloading(false);
          }
        })
        .catch((e) => console.log(e));
    } else {
        setloading(false);
    }
  }, [token, isLogin]);


  const logout = () => {
    localStorage.removeItem("accessToken");
    setloading(true);
    setisLogin(false);
    setuser(null);
  };
   
    const contextValue = {
        test,
        setisLogin,
        setloading,
        user,
        loading,
        logout


    }
    return (
        <myContext.Provider value = {contextValue}> {children} </myContext.Provider>
    );
};

export default Authcontext;
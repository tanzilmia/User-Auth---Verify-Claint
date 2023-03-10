import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../../contextApi/Authcontext";

const Login = () => {
    const [error, setError] = useState('')
    const {setisLogin,setloading} =  useContext(myContext)
    const neviget =  useNavigate()
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters long";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setloading(true)
        const email = values.email;
        const password =  values.password;
        const user ={
            email,
            password
        }

        axios.post(`https://user-verify-server.vercel.app/auth/login`, user)
        .then(res => {
          console.log(res.data);
          if(res.data.message ==="Login Successful"){
            const token = res.data.data
            localStorage.setItem("accessToken",token)
            setisLogin(true)
            neviget('/')
          }
          if(res.data.message ==="password not Match"){
            setError("password not Match")
          }
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
       <div className=" flex justify-center flex-col items-center mx-auto">
        <h1 className="text-center text-2xl">Login Form</h1>
         <Form className="bg-white shadow-md rounded w-7/12 px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" />
            <ErrorMessage className="text-red-500 text-xs italic" name="email" component="div" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" />
            <ErrorMessage className="text-red-500 text-xs italic" name="password" component="div" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>

          <div className="flex">
            <p className="text-xs">New To this site ?  <Link className="text-[#1c201e] font-bold" to = '/register'>Register Now</Link> Or <Link className="text-[#1c201e] font-bold" to ='/verify'>Verify Email</Link> </p>
          </div>

          <p className="text-[red]">{error}</p>

        </Form>
       </div>
      )}
    </Formik>   
  );
};

export default Login;

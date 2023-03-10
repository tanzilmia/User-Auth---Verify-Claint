import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
    const [error, setError] = useState('')
    const neviget = useNavigate()
  return (
    <Formik
      initialValues={{  UserID: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.UserID) {
          errors.UserID = "UserID is required";
        } else if (values.UserID.length < 23) {
          errors.UserID = "UserID must be at least 23 characters long";
        }
        

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const userid =  values.UserID;
        axios.put(`https://user-verify-server.vercel.app/auth/verify-email`, {userid})
        .then(res => {
            if(res.data.message === "Fake Code"){
                setSubmitting(false)
                setError("Fake Code")

            }
            if(res.data.message === "Update Complete"){
                neviget('/login')
            }
        })
        .catch(e=> console.log(e))
        
      }}
    >
      {({ isSubmitting }) => (
       <div className=" flex justify-center flex-col items-center mx-auto">
        <h1 className="text-center text-xl"> Check Your Email We Send A Verify Code  </h1>
         <Form className="bg-white shadow-md rounded w-7/12 px-8 pt-6 pb-8 mb-4">
         
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="UserID">
              Enter Verification Code   
            </label>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="UserID" />
            <ErrorMessage className="text-red-500 text-xs italic" name="UserID" component="div" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
          <p> {error} </p>
        </Form>
       </div>
      )}
    </Formik>   
  );
};

export default Verify;

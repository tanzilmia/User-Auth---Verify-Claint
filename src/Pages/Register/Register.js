import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";


const Register = () => {

    const sendEmail = (verifyId, userEmail) => {
        const templateParams = {
          verifyId: verifyId,
          userEmail: userEmail,
        };
      
        emailjs
          .send(
            "service_vguze0y",
            "template_fqlobor",
            templateParams,
            "KI7KWhJIA-Vqyqtl6"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      };
      

    const naviget = useNavigate()
  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
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

        if (!values.name) {
          errors.name = "name is required";
        } else if (values.name.length < 4) {
          errors.name = "name must be at least 4 characters long";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const email = values.email;
        const password = values.password;
        const name = values.name;
        const user = {
          name,
          email,
          password,
          verify:false
        };
        
        setSubmitting(false);

        axios.post(`https://user-verify-server.vercel.app/auth/register`, user)
        .then(res => {
            if(res.data.message === "success"){
                const verifyId = res?.data?.data?._id
                naviget('/verify')
                sendEmail(verifyId, email);

           
            }
        })
        .catch(e=> console.log(e))

      }}
    >
      {({ isSubmitting }) => (
        <div className=" flex justify-center flex-col items-center mx-auto">
          <h1 className="text-center text-2xl">Register Form</h1>
          <Form className="bg-white shadow-md rounded w-7/12 px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
              />
              <ErrorMessage
                className="text-red-500 text-xs italic"
                name="name"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
              />
              <ErrorMessage
                className="text-red-500 text-xs italic"
                name="email"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
              />
              <ErrorMessage
                className="text-red-500 text-xs italic"
                name="password"
                component="div"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
            <div className="flex">
            <p className="text-xs">Already Have an account ?  <Link className="text-[#1c201e] font-bold" to = '/login'>Login Now</Link></p>
          </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;

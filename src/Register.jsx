import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router';

function Register() {
     const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      reEnterPassword : ""
    },
    validate: (values) => {
      let error = {};

      if (values.email == "") {
        error.email = "Please enter the email";
      }

      if (values.password == "") {
        error.password = "Please enter the password";
      }

      if(values.password !== values.reEnterPassword){
        error.reEnterPassword = "Please enter the password correctly";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const loginResp = await axios.post(
          `${import.meta.env.VITE_API}/login`,
          values
        );
        window.localStorage.setItem("app_token",loginResp.data.token);
        navigate("/home")
      } catch (error) {
        if (error.status) {
          alert(error.response.data.email);
        }
      }
    },
  });
  return (
      <div className="flex w-full justify-center items-center">
      <div className="w-2xl">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-2xl">Login</h1>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500">please enter the email</span>
            )}
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-500">please enter the password</span>
            )}
          </div>
          <div>
            <label htmlFor="">Re-Enter Password</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="reEnterPassword"
              value={formik.values.reEnterPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.reEnterPassword && formik.errors.reEnterPassword && (
              <span className="text-red-500">please enter the password again</span>
            )}
          </div>
          <input
            type="submit"
            class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          />
        </form>
      </div>
    </div>
  )
}

export default Register
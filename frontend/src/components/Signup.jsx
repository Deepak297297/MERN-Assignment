import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [passVisible, setPassVisible] = useState(false);

  const sendEmailToUser = (email, user) => {
    Email.send({
      Host: "smtp.gmail.com",
      to: email,
      From: "hyrrCompany@gmail.com",
      Subject: "Welcome to Hyrr",
      Body: `Hello ${user}, <br/> Welcome to Hyrr. We are glad to have you on board. <br/> <br/> Regards, <br/> Hyrr Team`,
    }).then((message) => {
      console.log("mail sent successfully");
    });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  };
  const validatePassword = (password) => {
    return String(password).match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const terms = event.target[4].checked;

    if (!terms) {
      alert("You must accept the terms and conditions");
      return;
    }

    // email validation
    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }
    // password validation
    if (!validatePassword(password)) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }
    axios
      .post("http://localhost:3001/signup", { user, email, password })
      .then((res) => {
        if (res.status !== 201) {
          alert(res.data.message);
        } else {
          alert("Successfully signed up");
          // send-Email
          sendEmailToUser(email, user);
          localStorage.setItem("token", res.data.token);
          navigate("/posts");
        }
      })
      .catch((err) => {
        alert(err.response.data.messsage)
      });
  };
  return (
    <div className="h-[calc(100%-64px)] bg-gray-900 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 px-3 py-2 block w-full border-gray-700 rounded-md shadow-sm focus:outline-none focus:border-b-2"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 px-3 py-2 block w-full border-gray-700 rounded-md shadow-sm focus:outline-none focus:border-b-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={passVisible ? "text" : "password"}
                className="mt-1 px-3 py-2 block w-[90%] border-gray-700 rounded-md shadow-sm focus:outline-none focus:border-b-2"
                placeholder="Enter your password"
              />
              <input
                type="checkbox"
                onClick={() => setPassVisible(!passVisible)}
              />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              required
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded focus:outline-none focus:ring focus:ring-offset-0"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the Terms and Conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-b-2"
          >
            Sign Up
          </button>

          <div className="flex items-center justify-center mt-4">
            <div className="mr-4" aria-label="Google-signin">
              <FaGoogle className="text-3xl text-blue-500 hover:text-blue-600 cursor-pointer" />
            </div>
            <div className="mr-4" aria-label="Facebook-signin">
              <FaFacebook className="text-3xl text-blue-600 hover:text-blue-700 cursor-pointer" />
            </div>
            <div className="mr-4" aria-label="Linkedin-signin">
              <FaLinkedin className="text-3xl text-blue-800 hover:text-blue-900 cursor-pointer" />
            </div>
            <div aria-label="Github-signin">
              <FaGithub className="text-3xl text-gray-800 hover:text-gray-900 cursor-pointer" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

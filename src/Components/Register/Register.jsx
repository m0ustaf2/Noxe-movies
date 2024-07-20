import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isRePasswordShown, setIsRePasswordShown] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });
  const [errorsList, setErrorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const submitFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Custom validation for password match
    if (user.password !== user.rePassword) {
      setErrorsList([{ message: "Passwords do not match", context: { label: "rePassword" } }]);
      setIsLoading(false);
      return;
    }

    const validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorsList(validationResponse.error.details);
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        user
      );

      if (data.message === "success") {
        toast.success("Signup successful!");
        goToLogin();
      } else {
        toast.error("Signup failed.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Bad request. Please check your input and try again.");
        if (error.response.data.errors) {
          const detailedErrors = error.response.data.errors;
          setErrorsList(Object.values(detailedErrors).flat());
        }
      } else if (error.response && error.response.status === 409) {
        toast.error("Account already exists.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFormData = () => {
    const schema = Joi.object({
      name: Joi.string().alphanum().required().min(2).max(10),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net", "eg", "gov", "edu"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z0-9]{6,10}$/)),
      rePassword: Joi.string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z0-9]{6,10}$/)),
      phone: Joi.string()
        .required()
        .pattern(new RegExp(/^01[0125][0-9]{8}$/)),
    });
    return schema.validate(user, { abortEarly: false });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const getInputValue = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="w-75 m-auto py-5">
        <h2>Register Now:</h2>
        <form onSubmit={submitFormData}>
          <div className="input-data my-2">
            <label htmlFor="first_name">Name</label>
            <input
              onChange={getInputValue}
              type="text"
              className="form-control bg-transparent text-light my-2"
              name="name"
            />
            {errorsList.filter((error) => error.context.label === "name")[0] ? (
              <div className="alert alert-danger my-2">
                {
                  errorsList.filter((error) => error.context.label === "name")[0]
                    ?.message
                }
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="input-data my-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={getInputValue}
              type="email"
              className="form-control bg-transparent text-light my-2"
              name="email"
            />
            {errorsList.filter((error) => error.context.label === "email")[0] ? (
              <div className="alert alert-danger my-2">
                {
                  errorsList.filter((error) => error.context.label === "email")[0]
                    ?.message
                }
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="input-data my-2">
            <label htmlFor="password">Password</label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                onChange={getInputValue}
                type={isPasswordShown ? "text" : "password"}
                className="form-control bg-transparent text-light my-2"
                name="password"
              />
              <span
                className="faEye"
                onClick={() => setIsPasswordShown((prev) => !prev)}
              >
                {!isPasswordShown ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
            {errorsList.filter((error) => error.context.label === "password")[0] ? (
              <div className="alert alert-danger my-2">
                password must start with uppercase and at least 6 characters &
                special character not allowed....
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="input-data my-2">
            <label htmlFor="rePassword">rePassword</label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                onChange={getInputValue}
                type={isRePasswordShown ? "text" : "password"}
                className="form-control bg-transparent text-light my-2"
                name="rePassword"
              />
              <span
                className="faEye"
                onClick={() => setIsRePasswordShown((prev) => !prev)}
              >
                {!isRePasswordShown ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
            {errorsList.filter((error) => error.context.label === "rePassword")[0] ? (
              <div className="alert alert-danger my-2">
                {errorsList.filter((error) => error.context.label === "rePassword")[0]?.message}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="input-data my-2">
            <label htmlFor="phone">Phone</label>
            <input
              onChange={getInputValue}
              type="phone"
              className="form-control bg-transparent text-light my-2"
              name="phone"
            />
            {errorsList.filter((error) => error.context.label === "phone")[0] ? (
              <div className="alert alert-danger my-2">Invalid phone number</div>
            ) : (
              ""
            )}
          </div>

          <button className="btn btn-outline-info float-end my-3">
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
          <div className="clear-fix"></div>
        </form>
      </div>
    </>
  );
}

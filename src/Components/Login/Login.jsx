import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthStore";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function Login() {
  const [isShown, setIsShown] = useState(false);
  const type = isShown ? "text" : "password";
  let { saveUserData } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorsList, setErrorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  let goToHome = () => {
    navigate("/Noxe-movies");
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorsList(validationResponse.error.details);
      setIsLoading(false);
      return;
    }
  
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        user
      );
  
      if (data.message === "success") {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        saveUserData();
        goToHome();
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (error) {
      if (error.response) {
        // Handle specific status codes
        const { status, data } = error.response;
        if (status === 401) {
          toast.error(data.message || "Incorrect email or password.");
        } else if (status === 400) {
          toast.error(data.message || "Bad request. Please check your input.");
        } else if (status === 409) {
          toast.error(data.message || "Account already exists.");
        } else {
          toast.error(data.message || "An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  let validateFormData = () => {
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net", "eg", "gov", "edu"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z0-9]{6,10}$/)),
    });
    return schema.validate(user, { abortEarly: false });
  };

  let getInputValue = (e) => {
    let myUser = { ...user }; //--->deep copy
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className=" w-75 m-auto py-5">
        <h2>Login Form</h2>
        <form onSubmit={submitFormData}>
          <div className="input-data my-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={getInputValue}
              type="email"
              className="form-control  bg-transparent text-light my-2"
              name="email"
            />
            {errorsList.filter(
              (error) => error.context.label == "first_name"
            )[0] ? (
              <div className="alert alert-danger my-2">
                {
                  errorsList.filter(
                    (error) => error.context.label == "first_name"
                  )[0]?.message
                }
              </div>
            ) : (
              ""
            )}
            {errorsList.filter((error) => error.context.label == "email")[0] ? (
              <div className="alert alert-danger my-2">
                {
                  errorsList.filter(
                    (error) => error.context.label == "email"
                  )[0]?.message
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
              type={type}
              className="form-control  bg-transparent text-light my-2"
              name="password"
            />
            <span
              className="faEye "
              onClick={() => setIsShown((prev) => !prev)}
            >
              {!isShown ? (
                <LuEye/>
              ) : (
                <LuEyeOff/>
              )}
            </span>
           </div>
            {errorsList.filter(
              (error) => error.context.label == "password"
            )[0] ? (
              <div className="alert alert-danger my-2">
                {
                  errorsList.filter(
                    (error) => error.context.label == "password"
                  )[0]?.message
                }
              </div>
            ) : (
              ""
            )}
          </div>

          <button className="btn btn-outline-info float-end my-3">
            {isLoading == true ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
          <div className="clear-fix"></div>
        </form>
      </div>
    </>
  );
}

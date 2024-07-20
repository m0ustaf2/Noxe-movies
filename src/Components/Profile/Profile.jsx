import React, { useContext } from "react";
import styles from "./Profile.module.scss";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Context/AuthStore";
export default function Profile() {

  let {userData} =useContext(AuthContext)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      <div
        className={`profile w-75 p-3  py-5 my-5 m-auto text-start  ${styles.bgProfile}`}
      >
        <h2 className="text-center mb-5">Welcome,{userData?.name}</h2>
        <h3>
          Name : {userData?.name} 
        </h3>
        <h3 className="my-4">Role : {userData?.role}</h3>
      </div>
    </>
  );
}

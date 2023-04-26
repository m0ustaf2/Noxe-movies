import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Register() {
  const notify = (msg,type) => {
    toast[type](msg);
  }
  const [user, setUser] = useState({
    'first_name':'',
    'last_name':'',
    'age':'',
    'email':'',
    'password':''
  });
   const [errorsList, setErrorsList] = useState([])
   const [isLoading,setIsLoading]=useState(false);
  let navigate=useNavigate();
  let submitFormData= async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    let validationResponse=validateFormData();
    if(validationResponse.error){
setErrorsList(validationResponse.error.details)
    }else{
let {data}= await axios.post('https://sticky-note-fe.vercel.app/signup',user)
    if(data.message=='success'){
  notify("success","success")
    goToLogin()
    setIsLoading(false)
    }
    else{
      notify(data.message,'error')
      setIsLoading(false)
    }
    }
    
  };
  let validateFormData=()=>{
    const schema=Joi.object({
      first_name:Joi.string().alphanum().required().min(2).max(10),
      last_name:Joi.string().alphanum().required().min(2).max(10),
      age:Joi.number().required().min(20).max(80),
      email:Joi.string().required().email({tlds:{allow:['com','net','eg','gov','edu']}}),
      password:Joi.string().required().pattern(new RegExp(/[A-Z][a-z]{3,7}/))

    })
    return schema.validate(user,{abortEarly:false});
  }
  let goToLogin=()=>{
    navigate('/login')
  }
  let getInputValue=(e)=>{
    //let myUser=user; //-->shallow copy ely etnen by4awro 3la nfs el index
    let myUser={...user}; //--->deep copy 
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
  }
  return (
  <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                
            </Helmet>
  <div className=' w-75 m-auto py-5'>
  <h2 className='text-center'>Register Now : </h2>  
  <form onSubmit={submitFormData}>
    <div className='input-data my-2'>
      <label htmlFor="first_name">First Name</label>
      <input onChange={getInputValue} type="text" className='form-control bg-transparent text-light my-2' name='first_name'/>
      {errorsList.filter((error)=>error.context.label=='first_name')[0]?<div className="alert alert-danger my-2">{errorsList.filter((error)=>error.context.label=='first_name')[0]?.message}</div>:''}
    </div>
    <div className='input-data my-2'>
      <label htmlFor="last_name">Last Name</label>
      <input onChange={getInputValue} type="text" className='form-control bg-transparent text-light my-2' name='last_name'/>
      {errorsList.filter((error)=>error.context.label=='last_name')[0]?<div className="alert alert-danger my-2">{errorsList.filter((error)=>error.context.label=='last_name')[0]?.message}</div>:''}
    </div>
    <div className='input-data my-2'>
      <label htmlFor="age">Age</label>
      <input onChange={getInputValue} type="number" className='form-control bg-transparent text-light my-2' name='age'/>
      {errorsList.filter((error)=>error.context.label=='age')[0]?<div className="alert alert-danger my-2">{errorsList.filter((error)=>error.context.label=='age')[0]?.message}</div>:''}
    </div>
    <div className='input-data my-2'>
      <label htmlFor="email">Email</label>
      <input onChange={getInputValue} type="email" className='form-control bg-transparent text-light my-2' name='email'/>
      {errorsList.filter((error)=>error.context.label=='email')[0]?<div className="alert alert-danger my-2">{errorsList.filter((error)=>error.context.label=='email')[0]?.message}</div>:''}
    </div>
    <div className='input-data my-2'>
      <label htmlFor="password">Password</label>
      <input onChange={getInputValue} type="password" className='form-control bg-transparent text-light my-2' name='password'/>
      
      {errorsList.filter(error =>error.context.label == "password")[0]?<div className='alert alert-danger'>Password should start with capital letter followed by 3 small letter</div>:''}
    </div>

    <button className='btn btn-info float-end my-3'>
    {isLoading== true ?<i className='fas fa-spinner fa-spin'></i>:'Register'}
    </button>
    <div className="clear-fix"></div>
  </form>
  </div>
  </>
  )
}

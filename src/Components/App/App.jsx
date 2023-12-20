import { useContext } from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthStore';
import Details from '../Details/Details';
import MasterLayout from '../MasterLayout/MasterLayout';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Home from './../Home/Home';
import Login from './../Login/Login';
import Movies from './../Movies/Movies';
import Notfound from './../Notfound/Notfound';
import People from './../People/People';
import Profile from './../Profile/Profile';
import Register from './../Register/Register';
import Tvshows from './../Tvshows/Tvshows';
import { Offline } from 'react-detect-offline';
import Disconnected from '../Disconnected/Disconnected';
import { ToastContainer } from 'react-toastify';

function App() {
 let{userData,saveUserData,logout}= useContext(AuthContext)
  
  let routes=createHashRouter([
    {
    path:"/",
    element:<MasterLayout userData={userData} logout={logout}/>,
    errorElement:<Notfound/>,
    children:[
      {index:true,element:<Home/>},
      {path:'/Noxe-movies',element:<Home/>},
      {path:'movies',element:<Movies/>},
      {path:'tvshows',element:<Tvshows/>},
      {path:'profile',element:<Profile/>},
      {path:'details/:id/:mediaType',element:<Details/>},
      // {path:'register',element:<Register/>},
      {path:'people',element:<People/>},
      // {path:'login',element:<Login saveUserData={saveUserData}/>},
    ],
  }
  ])
  return (
    <>
    <ToastContainer theme='dark'
    autoClose={1000}
    style={{ marginTop:50 }}/>
    <Offline><Disconnected/></Offline>

     <RouterProvider router={routes} />
      
     </>
   );
  
}

export default App;

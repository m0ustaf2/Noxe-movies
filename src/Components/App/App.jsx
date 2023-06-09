import { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  
  let routes=createBrowserRouter([
    {
    path:"/",
    element:<MasterLayout userData={userData} logout={logout}/>,
    errorElement:<Notfound/>,
    children:[
      {index:true,element:<ProtectedRoute  userData={userData}><Home/></ProtectedRoute>},
      {path:'/Noxe-movies',element:<ProtectedRoute  userData={userData}><Home/></ProtectedRoute>},
      {path:'movies',element:<ProtectedRoute  userData={userData}><Movies/></ProtectedRoute>},
      {path:'tvshows',element:<ProtectedRoute userData={userData}><Tvshows/></ProtectedRoute>},
      {path:'profile',element:<ProtectedRoute userData={userData}><Profile userData={userData}/></ProtectedRoute>},
      {path:'details/:id/:mediaType',element:<ProtectedRoute userData={userData}><Details userData={userData}/></ProtectedRoute>},
      {path:'register',element:<Register/>},
      {path:'people',element:<ProtectedRoute  userData={userData}><People/></ProtectedRoute>},
      {path:'login',element:<Login saveUserData={saveUserData}/>},
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

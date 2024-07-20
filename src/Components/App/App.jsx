import { useContext } from "react";
import { Offline } from "react-detect-offline";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../Context/AuthStore";
import Details from "../Details/Details";
import Disconnected from "../Disconnected/Disconnected";
import MasterLayout from "../MasterLayout/MasterLayout";
import Home from "./../Home/Home";
import Movies from "./../Movies/Movies";
import Notfound from "./../Notfound/Notfound";
import People from "./../People/People";
import Profile from "./../Profile/Profile";
import Tvshows from "./../Tvshows/Tvshows";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  let { userData, saveUserData, logout } = useContext(AuthContext);

  let routes = createHashRouter([
    {
      path: "/",
      element: <MasterLayout/>,
      // element: <MasterLayout/>,
      errorElement: <Notfound />,
      children: [
        { index: true, element:<ProtectedRoute><Home /></ProtectedRoute>  },
        { path: "/Noxe-movies", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "movies", element:<ProtectedRoute><Movies /></ProtectedRoute>  },
        { path: "tvshows", element:<ProtectedRoute><Tvshows /> </ProtectedRoute>  },
        { path: "profile", element:<ProtectedRoute><Profile /> </ProtectedRoute>   },
        { path: "details/:id/:mediaType", element: <ProtectedRoute><Details /> </ProtectedRoute>  },
        {path:'register',element:<Register/>},
        { path: "people", element:<ProtectedRoute><People /></ProtectedRoute>  },
        // {path:'login',element:<Login saveUserData={saveUserData}/>},
        {path:'login',element:<Login/>},
        {path:'*',element:<Notfound/>},
      ],
    },
  ]);
  return (
    <>
      <ToastContainer theme="dark" autoClose={1000} style={{ marginTop: 50 }} />
      <Offline>
        <Disconnected />
      </Offline>
      
        <RouterProvider router={routes} />
    </>
  );
}

export default App;

import React, { useContext, useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import Sidebar from './Components/Sidebar'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Search from './Components/Search';
import Playlist from './Components/Playlist';
import PlayList from './Pages/PlayList';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Layout from './Components/Layout';
import { Context } from './contexts/Context';
import { useAuth } from './contexts/AuthContext';
import Logout from './Pages/Logout';
import axios from 'axios';
import PublicPlay from './Pages/PublicPlay';

const App = () => {
  const { setPlay } = useContext(Context);
  const { token, currUser } = useAuth();

  let ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  
  useEffect(() => {
    async function getData() {
      if (currUser) {
        await axios
          .get(`${import.meta.env.VITE_BAPI_URL}/playlist/${currUser._id}/playlists`)
          .then((res) => {
            setPlay(res.data);
            // console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    getData();
  }, []);


  return (
    <div>
      
      <BrowserRouter>
      {/* <Sidebar/> */}
      <Routes>
        {/* UnProtected Routes */}
        
        <Route path="/" element={<Layout><Search /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/playlists"
          element={<ProtectedRoute children={<Layout><Playlist /></Layout>} />}
        />
        <Route
          path="/publicplay"
          element={<ProtectedRoute children={<Layout><PublicPlay /></Layout>} />}
        />
        <Route
          path="/playlists/:id"
          element={<ProtectedRoute children={<Layout><PlayList /></Layout>} />}
        />
        <Route
          path="/logout"
          element={<ProtectedRoute children={<Logout />} />}
        />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
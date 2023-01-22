import { Route, Routes } from "react-router-dom";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import RequireUser from "./components/RequireUser";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import UpdateProfile from './components/updateProfile/UpdateProfile'
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import OnlyIfNotLoggedIn from "./components/OnlyIfNotLoggedIn";
import {toast, Toaster} from 'react-hot-toast'
export const TOAST_SUCCESS = 'toast_success'
export const TOAST_FAILURE = 'toast_failure'


function App() {

  const loadingRef = useRef(null)
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading)
  const toastData = useSelector((state) => state.appConfigReducer.toastData)

  if(isLoading){
    loadingRef.current?.continuousStart();
  }else{
    loadingRef.current?.complete();
  }

  useEffect(() => {
    switch(toastData.type){
      case TOAST_SUCCESS:
        toast.success(toastData.message)
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message)
        break;
    }
  }, [toastData])
  return (
    <div className="App">
      <LoadingBar color='#000' ref={loadingRef} />
      <Toaster />
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

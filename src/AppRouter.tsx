import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
  } from "react-router-dom";

  import React, { useEffect, useState } from "react";

import Admin from "./view/admin/Admin";
import Home from "./view/home/Home";
import Login from "./view/login/Login";
import Mypage from "./view/mypage/Mypage";
import Post from "./view/post/Post";
import Write from "./view/write/Write";
import Navigation from "./component/navigation/Navigation";



function AppRouter(){

    return(
       <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                
                <Route path="/home" element = {<Home />} />
                <Route path="/write" element = {<Write />} />
                <Route path="/dashboard" element = {<Admin />} />    
                <Route path="/mypage" element = {<Mypage />} />  
                <Route path="/post/*" element = {<Post />} />
            </Routes>
       </Router> 
    )
}

export default AppRouter;
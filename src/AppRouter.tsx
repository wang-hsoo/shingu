import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Login from "./routes/Login";
import DataChart from "./routes/DataChart";
import Home from "./routes/Home";
import Mypage from "./routes/Mypage";
import Post from "./routes/Post";
import Write from "./routes/Write";

function AppRouter(){

    return(
       <Router>
            <Routes>
                <Route path="/" element = {<Login />} />
                <Route path="/home" element = {<Home />} />
                <Route path="/:title" element = {<Home />} />
                <Route path="/write" element = {<Write />} />
                <Route path="/Post" element = {<Post />} />
                <Route path="/Post/:no" element = {<Post />} />
                <Route path="/DataChart" element = {<DataChart />} />    
                <Route path="/Mypage" element = {<Mypage />} />   
            </Routes>
       </Router> 
    )
}

export default AppRouter;
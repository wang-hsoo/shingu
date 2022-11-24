import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import DataChart from "./routes/DataChart";
import Home from "./routes/Home";
import Mypage from "./routes/Mypage";
import Post from "./routes/Post";
import Test from "./routes/Test";
import Write from "./routes/Write";

function AppRouter(){

    return(
       <Router>
            <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/:title" element = {<Home />} />
                <Route path="/write" element = {<Write />} />
                <Route path="/Post" element = {<Post />} />
                <Route path="/Post/:no" element = {<Post />} />
                <Route path="/DataChart" element = {<DataChart />} />    
                <Route path="/Mypage" element = {<Mypage />} />   
                <Route path="/test" element = {<Test />} />    
            </Routes>
       </Router> 
    )
}

export default AppRouter;
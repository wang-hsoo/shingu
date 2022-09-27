import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import DataChart from "./routes/DataChart";
import Home from "./routes/Home";
import Post from "./routes/Post";
import Write from "./routes/Write";

function AppRouter(){

    return(
       <Router>
            <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/write" element = {<Write />} />
                <Route path="/Post" element = {<Post />} />
                <Route path="/DataChart" element = {<DataChart />} />    
            </Routes>
       </Router> 
    )
}

export default AppRouter;
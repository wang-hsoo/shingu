import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../component/navigation/Navigation";

function Home(){


    return(
        <div>
            <Navigation check={true} />
            home
        </div>
    )
}

export default Home;
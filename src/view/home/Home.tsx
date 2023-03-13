import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainBanner from "../../component/banner/MainBanner";
import Navigation from "../../component/navigation/Navigation";

function Home(){


    return(
        <div>
            <Navigation check={true} />
            <MainBanner />
            home
        </div>
    )
}

export default Home;
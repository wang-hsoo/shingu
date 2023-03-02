import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();

    useEffect(()=>{
        const user = sessionStorage.getItem("userInfo");
        
        if(user == null){
            navigate("/", {replace:true});
        }
    }, [])

    return(
        <div>
            home
        </div>
    )
}

export default Home;
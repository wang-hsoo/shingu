import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./component/AdminLogin";
import Register from "./component/Register";
import UserLogin from "./component/UserLogin";
import { Wrapper } from "./styles";




function Login(){
    const [checkLogin, setCheckLogin] = useState<string>("student");
    const navigate = useNavigate();

    useEffect(()=>{
        const user = sessionStorage.getItem("userInfo");
        
        if(user != null){
            navigate("/home", {replace:true});
        }
    }, [])
    

    return(
        <Wrapper>
            <div>
                <div>LOGIN</div>
                <div>
                    <div onClick={() => {setCheckLogin("student")}}>학생</div>
                    <div onClick={() => {setCheckLogin("admin")}}>관리자</div>
                </div>

                {checkLogin == "student" && <UserLogin />}
                {checkLogin == "admin" && <AdminLogin />}
                {checkLogin == "register" && <Register />}

                <div  onClick={() => {setCheckLogin("register")}}>회원가입</div>
            </div>
        </Wrapper>
    )
}


export default Login;
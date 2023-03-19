import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Iuser } from "../../service/Interface";
import { Container } from "../../styles/container";
import { GetDivisionName } from "../../utils/GetDivisionName";
import AdminLogin from "./component/AdminLogin";
import Register from "./component/Register";
import UserLogin from "./component/UserLogin";
import { LoginBox, LoginInput, Wrapper } from "./styles";





function Login(){
    const [checkLogin, setCheckLogin] = useState<string>("student");
    const navigate = useNavigate();

    useEffect(()=>{
        const user = sessionStorage.getItem("userInfo");
        
        if(user != null){
            const getUser = JSON.parse(user) as Iuser;
            
            GetDivisionName(getUser.divisioncode).then((divisionN) => {
                navigate(("/home/" + divisionN), {replace:false})
            } );
            
         
        }
    }, [])
    

    return(
        <Wrapper>
            <LoginBox>
                <div style={{width:"50%"}}>
                    {/**로고**/}
                    dd
                </div>
                <LoginInput>
                    <div>LOGIN</div>
                    <div>
                        <div onClick={() => {setCheckLogin("student")}}>학생</div>
                        <div onClick={() => {setCheckLogin("admin")}}>관리자</div>
                    </div>

                    {checkLogin == "student" && <UserLogin />}
                    {checkLogin == "admin" && <AdminLogin />}
                    {checkLogin == "register" && <Register />}

                    <div  onClick={() => {setCheckLogin("register")}}>회원가입</div>
                </LoginInput>
            </LoginBox>
        </Wrapper>
    )
}


export default Login;
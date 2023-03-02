import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Wrapper } from "../../styles/layout/AppLayout";




function Login(){
    const navigate = useNavigate();

    useEffect(()=>{
        const user = sessionStorage.getItem("userInfo");
        
        if(user != null){
            navigate("/home", {replace:true});
        }
    }, [])
    

    return(
        <Wrapper>
            <h1>LOGIN</h1>
            <Row>
                <div>학생</div>
                <div>관리자</div>
            </Row>

        </Wrapper>
    )
}


export default Login;
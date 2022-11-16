import React, { useState } from "react";
import { getAdmin, IAdmin } from "../service/BoardService";
import { useSetRecoilState } from "recoil";
import { isPopUp } from "../atom";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import Register from "./Register";
import styled from "styled-components";

const Wrraper = styled.div`
    width: 100%;
    height: 60vh;
    padding-top: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const LoginBox = styled.div`
    width: 469px;
    height: 330px;
    background-color: #ffffff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const LoginChange = styled.button`
    background-color: #95C94A;
    color: white;
    padding: 10px 108px;
    margin-top: 10px;
`

const RegisterBtn = styled.button`
    margin-top: 10px;
    color: #717171;
`

function Login(){
    const [admin, setAdmin] = useState<boolean>(false);
    const [user, setUser] = useState<boolean>(true);
    const [register, setRegister] = useState<boolean>(false);
    const setPopUp = useSetRecoilState(isPopUp);

    function reg(){
        setUser(false);
        setAdmin(false);
        setRegister(true)
    }

    function changeUse(event:React.MouseEvent<HTMLButtonElement>){
        const { innerHTML } = event.currentTarget;
        
        if(innerHTML === "관리자 로그인"){
            setUser(false);
            setAdmin(true);
            setRegister(false);
        }else{
            setAdmin(false);
            setUser(true);
            setRegister(false);
        }
    }


    return(
        <Wrraper>
            <button onClick={() => setPopUp((prev) => !prev)}>X</button>
            <LoginBox>
                {user && <UserLogin />}
                {admin && <AdminLogin />}
                {register && <Register />}
                <LoginChange onClick={changeUse}>{user ? "관리자 로그인" : "유저 로그인" }</LoginChange>
                <RegisterBtn onClick = {reg}>회원가입</RegisterBtn>
                
            </LoginBox>
            
        </Wrraper>
    )
}

export default Login;
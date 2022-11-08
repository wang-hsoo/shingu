import React, { useState } from "react";
import { getAdmin, IAdmin } from "../service/BoardService";
import { useSetRecoilState } from "recoil";
import { isPopUp } from "../atom";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import Register from "./Register";

function Login(){
    const [admin, setAdmin] = useState<boolean>(false);
    const [user, setUser] = useState<boolean>(true);
    const [register, setRegister] = useState<boolean>(false);
    const setPopUp = useSetRecoilState(isPopUp);

    function reg(){
        setUser(false);
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
        <div>
            {user && <UserLogin />}
            {admin && <AdminLogin />}
            {register && <Register />}
            <button onClick={changeUse}>{user ? "관리자 로그인" : "유저 로그인" }</button>
            <button onClick = {reg}>회원가입</button>
            <button onClick={() => setPopUp((prev) => !prev)}>X</button>
        </div>
    )
}

export default Login;
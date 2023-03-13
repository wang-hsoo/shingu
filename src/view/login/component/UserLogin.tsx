import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import { getOneMemberFromUserId } from "../../../service/UserService";
import { Iuser } from "../../../service/Interface";
import { LoginError, LoginMatchError } from "../../../utils/errorMessage";
import 'react-notifications-component/dist/theme.css'



function UserLogin(){
    const [id, setId] = useState<string>();
    const [pw, setPw] = useState<string>();
    const navigate = useNavigate();

    function onChange(event:React.ChangeEvent<HTMLInputElement>){
        const { value } = event.target as HTMLInputElement;
        const { name } = event.target as HTMLInputElement;
        
        switch ( name ){
            case "id":
                setId(value);
                break;

            case "pw":
                setPw(value);
                break;
        }

        
    }

    function onSubmit(e:React.FormEvent){
        e.preventDefault();
        if(id === undefined || pw === undefined || id === "" || pw ===""){
            LoginError();     
        }else{
                // getOneMemberFromUserId(Number(id)).then((value:Iuser) => {
                //     if(value.studentid === id && value.password === pw){
                //         const user = {
                //             username: value.username,
                //             studentid: value.studentid,
                //             divisioncode: value.divisioncode,
                //             darkmode: value?.darkmode
                //         };
                //         sessionStorage.setItem("user", JSON.stringify(user));
                //         navigate("/home");
                //     }else{
                //         LoginMatchError();
                //     }
                // }, function(reason){
                //     console.log(reason)
                // })
                const user = {
                                username: "왕현수",
                                studentid: 2018133064,
                                divisioncode: 24,
                                darkmode: false
                    };

                    sessionStorage.setItem("adminInfo", JSON.stringify(user));
                    navigate("/home");
        }
    }


    return(
        <form onSubmit={onSubmit}>
            <input placeholder="아이디" autoComplete="off" onChange={onChange} name="id" />
            <input type="password" placeholder="비밀번호"  onChange={onChange} name="pw" />
            <button>로그인</button>
            <ReactNotification />
        </form>
    )
}

export default UserLogin;
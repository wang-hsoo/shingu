import { getUser, Iuser } from "../service/BoardService";
import React, { useState } from "react";


function UserLogin(){
    const [id, setId] = useState<string>();
    const [pw, setPw] = useState<string>();

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
        if(id === undefined || pw === undefined){
            console.log("오류");
        }else{
                getUser(id).then(value => {
                    if(value.studentid === id && value.password === pw){
                            console.log("참");
                    }else{
    
                    }
               
                })
        }
    }


    return(
        <form onSubmit={onSubmit}>
            <h1>유저 로그인</h1>
            <input placeholder="아이디" onChange={onChange} name="id" />
            <input type="password" placeholder="비밀번호"  onChange={onChange} name="pw" />
            <button>로그인</button>
        </form>
    )
}

export default UserLogin;
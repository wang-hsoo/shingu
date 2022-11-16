import { getOneMemberFromUserId, getUser, Iuser } from "../service/BoardService";
import React, { useState } from "react";
import styled from "styled-components";


const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    h1{
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
    }
    input{
        width: 300px;
        height: 40px;
        padding: 0 10px;
        margin-bottom: 10px;
        border: 1px solid #ABABAB;
    }

    button{
        background-color: #95C94A;
        color: white;
        padding: 10px 130px;
    }

`

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
            

                getOneMemberFromUserId(Number(id)).then((value:Iuser) => {
                    if(value.studentid === id && value.password === pw){
                        const user = {
                            name: value.username,
                            id: value.studentid,
                            division: value.divisioncode
                        };
                        sessionStorage.setItem("user", JSON.stringify(user));
                        window.location.reload();
                    }
                })
        }
    }


    return(
            <Form onSubmit={onSubmit}>
                <h1>유저 로그인</h1>
                <input placeholder="아이디" autoComplete="off" onChange={onChange} name="id" />
                <input type="password" placeholder="비밀번호"  onChange={onChange} name="pw" />
                <button>로그인</button>
            </Form>
        
    )
}

export default UserLogin;
import React, { useState } from "react";
import { getAdmin, IAdmin } from "../service/BoardService";
import { useSetRecoilState } from "recoil";
import { isPopUp } from "../atom";

function Login(){
    const [id, setId] = useState<string>();
    const [pw, setPw] = useState<string>();
    const [chUse, setChUse] = useState<boolean>(false);
    const setPopUp = useSetRecoilState(isPopUp);

    function onSubmit(e:React.FormEvent){
        e.preventDefault();
        if(id === undefined || pw === undefined){
            console.log("오류");
        }else{
            if(chUse){
                getAdmin().then(value => {
                    value.map((check:IAdmin) => {
                        if(check.adminid === id && check.adminpwd === pw){
                            localStorage.setItem("admin", check.divisioncode+"");
                            setPopUp((prev) => !prev);
                            window.location.reload();
                        }else{
    
                        }
                    })
                })

            }else{

            }
        }
    }

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

    return(
        <form onSubmit={onSubmit}>
            <h1>{chUse ? "관리자 로그인" : "로그인"}</h1>
            <input placeholder="아이디" onChange={onChange} name="id" />
            <input type="password" placeholder="비밀번호"  onChange={onChange} name="pw" />
            <button>로그인</button>
            <button onClick={()=>setChUse((prev) => !prev) }>{chUse ? "사용자로 로그인" : "관리자로 로그인"}</button>
            <button>회원가입</button>
            <button onClick={() => setPopUp((prev) => !prev)}>X</button>
        </form>
    )
}

export default Login;
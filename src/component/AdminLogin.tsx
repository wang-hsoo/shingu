import { getAdmin, IAdmin } from "../service/BoardService";
import React, { useState } from "react";



function AdminLogin(){
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
                getAdmin().then(value => {
                    value.map((check:IAdmin) => {
                        if(check.adminid === id && check.adminpwd === pw){
                            sessionStorage.setItem("admin", check.divisioncode+"");
                            window.location.reload();
                        }else{
    
                        }
                    })
                })
        }
    }


    return(
        <form onSubmit={onSubmit}>
            <h1>관리자 로그인</h1>
            <input placeholder="아이디" autoComplete="off" onChange={onChange} name="id" />
            <input type="password" placeholder="비밀번호"  onChange={onChange} name="pw" />
            <button>로그인</button>
        </form>
    )

}

export default AdminLogin;
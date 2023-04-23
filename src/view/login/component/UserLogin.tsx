import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOneMemberFromUserId } from "../../../service/UserService";
import { Idivision, Iuser } from "../../../service/Interface";
import { LoginError, LoginMatchError } from "../../../utils/errorMessage";
import { getDivision } from "../../../service/EtcService";
import { GetDivisionName } from "../../../utils/GetDivisionName";


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
                getOneMemberFromUserId(Number(id)).then((value:Iuser) => {
                    
                    if(value.studentid === id && value.password === pw){
                        if( !value.approve ){
                            console.log("허용되지 않은 사용자");
                        }else{
                            const user = {
                                username: value.username,
                                studentid: value.studentid,
                                divisioncode: value.divisioncode,
                                darkmode: value?.darkmode,
                            };
                            sessionStorage.setItem("userInfo", JSON.stringify(user));
                            GetDivisionName(value.divisioncode).then((divisionN) => {
                                navigate(("/home/" + divisionN), {replace:false})
                            } );
                            
                            
                    
                        }
                        
                    }else{
                        LoginMatchError();
                    }
                }, function(reason){
                    LoginMatchError();
                })
                

                    
                
        }
    }


    return(
        <form onSubmit={onSubmit}>
            <input placeholder="아이디" autoComplete="off" onChange={onChange} name="id" />
            <input type="password" placeholder="비밀번호"  onChange={onChange} name="pw" />
            <button>로그인</button>
        </form>
    )
}

export default UserLogin;
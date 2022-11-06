import { createUser, getDivision, Idivision, Iuser } from "../service/BoardService";
import React, { useState,useEffect } from "react";

function Register(){
    const [id, setId] = useState<string>();
    const [pw, setPw] = useState<string>();
    const [division, setDivision] = useState<Idivision[]>();
    const [selectDivi, setSelectDivi] = useState<string>();
    const [selectDivision, setSelectDivision] = useState<Idivision>();

    function divisionChange(event:React.ChangeEvent<HTMLSelectElement>){
        const division = event.target.value.split(",");

            const selectdivi = {
                divisionname: division[0],
                divisioncode: Number(division[1]),
                upctg: Number(division[2])
            }
            setSelectDivision(selectdivi);
            
    }

    function diviChange(event:React.ChangeEvent<HTMLSelectElement>){
        const division = event.target.value.split(",");
            setSelectDivi(division[0]);
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

    function onSubmit(e:React.FormEvent){
        e.preventDefault();
        console.log(id, pw,selectDivi )
        if(id !== " " && id !== undefined && pw !== " " && pw !== undefined && selectDivi !== " " && selectDivi !== "전체"){
            const user = {
                studentid: id,
                username: "왕현수",
                password: pw,
                divisioncode: selectDivi
            } as Iuser;

            createUser(user);
        }
    }

    useEffect(() => {
        getDivision().then((value => {
            const divi = [];
            divi.push(value);
            setDivision(divi[0]);
        }));
    },[])

  


    return(
        <form onSubmit={onSubmit}>
            <h1>회원가입</h1>
            <input placeholder="학번" onChange={onChange} name="id" />
            <input type="password" placeholder="비밀번호"  onChange={onChange} name="pw" />

            <select onChange={divisionChange}>
                <option value="전체">전체학부</option>
                {division?.map((divi:Idivision) => ( 
                    divi.upctg !== 0 ? null : 
                    <option key={divi.divisioncode} value={[divi.divisionname, divi.divisioncode+"",  divi.upctg+""]}>{divi.divisionname}</option> 
                ))}
            </select>

            <select onChange={diviChange}>
                <option value="전체">전체학과</option>
                {division?.map((divi:Idivision) => (
                    divi.upctg !== selectDivision?.divisioncode ? null :
                    <option key={divi.divisioncode} value={ [divi.divisionname, divi.divisioncode+"",  divi.upctg+""]}>{divi.divisionname}</option>
                ))}
            </select>
            <button>가입하기</button>
        </form>
    )
}

export default Register;
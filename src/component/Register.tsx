import { createUser, getDivision, getOneMemberFromUserId, Idivision, InewBoard, Iuser } from "../service/BoardService";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import arrow from "../img/arrow.jpg";

const Form = styled.form`
    & > div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 50px;

    }
    
    
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
        width: 300px;
        background-color: #95C94A;
        color: white;
        padding: 10px 0;
    }
`

const List = styled.ul`
    width: 300px;

    & > ul{
        position: absolute;
        z-index: 1;
        width: 300px;
        background-color: #ffffff;
    }
   
    
`
const DiviList = styled.ul<{display:boolean}>`
    display: ${(props) => props.display ? 'block' : 'none'};
    & > li{
        width: 100%;
        padding: 10px 0;
        text-align: center;
        border: 1px solid #ABABAB;
        cursor: pointer;
        
        position: relative;
        top: -10px;
        z-index: 88;
        transition: .3s;
        color: #717171;
        &:hover{
            color: white;
            background-color: #95C94A;
        }
    }
    
`
const DList = styled.ul<{display:boolean}>`
    display: ${(props) => props.display ? 'block' : 'none'};
    & > li{
        width: 100%;
        padding: 10px 0;
        text-align: center;
        border: 1px solid #ABABAB;
        cursor: pointer;
        
        position: relative;
        top: -10px;
        z-index: 88;
        transition: .3s;
        color: #717171;
        &:hover{
            color: white;
            background-color: #95C94A;
        }
    }
    
`

const Title = styled.div`
    display: flex;
    flex-direction: row !important;
    width: 100%;
    padding:  0;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: 1px solid #ABABAB;
    margin-bottom: 10px;
    color: #717171;
    position: relative;

`

function Register(){
    const [id, setId] = useState<string>();
    const [pw, setPw] = useState<string>();
    const [name, setName] = useState<string>();
    const [division, setDivision] = useState<Idivision[]>();
    const [selectDivi, setSelectDivi] = useState<string>();
    const [selectDivision, setSelectDivision] = useState<Idivision>();
    const [regiSucess, setRegiSucess] = useState<boolean>(false);
    const [check, setCheck] = useState<Boolean>(false);
    const [Dcheck, setDCheck] = useState<Boolean>(false);

    function divisionChange(event:React.MouseEvent<HTMLUListElement>){
        setCheck((props) => !props);
        const { innerText} = event.target as HTMLElement;

        
        if(!innerText.includes('&')){
            let code = 0 as Number;

            division?.map((division:Idivision) => {
                if(division.divisionname === innerText){
                    code = Number(division.divisioncode);
                }
        })
        
        

            const selectdivi = {
                divisionname: innerText,
                divisioncode: Number(code),
                upctg: Number(code)
            }
            setSelectDivi("전체학과");
            setSelectDivision(selectdivi);
            

        }
        
        
            
            
    }

    function diviChange(event:React.MouseEvent<HTMLUListElement>){

        setDCheck((props) => !props);
        const { innerText} = event.target as HTMLElement;
    
        if(!innerText.includes('&')){
            setSelectDivi(innerText);
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

            case "name":
                setName(value);
                break;

        }
    }

    function onSubmit(e:React.FormEvent){
        e.preventDefault();
        
        if(id !== " " && id !== undefined && pw !== " " && pw !== undefined && selectDivi !== " " && selectDivi !== "전체"){
            
            
            const user = {
                username: name,
                password: pw,
                divisioncode: `${selectDivision?.divisionname},${selectDivi}`,
                studentid: id,
            }as Iuser;
            
            getOneMemberFromUserId(Number(id)).then((value:Iuser) => {
                if(value.studentid === id){
                    console.log("아이디 있음");
                }else{
                    createUser(user);
                    setRegiSucess(true);
                }   
            })
            
            
            
            

            
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
        <Form onSubmit={onSubmit}>
            {regiSucess ? <div>정상적으로 회원가입을 완료하였습니다.</div> :
            <div>
                <h1>회원가입</h1>
                <input type="text" placeholder="이름"  onChange={onChange} name="name" />
                <input placeholder="학번" onChange={onChange} name="id" />
                <input type="password" placeholder="비밀번호"  onChange={onChange} name="pw" />

                
                <List onClick={divisionChange}>
                    <Title>
                        <div></div>
                        <div>{selectDivision?.divisionname || "전체 학부"}</div>
                        <img src={arrow} />
                    </Title>
                    <DiviList display={check as boolean}>
                        {division?.map((divi:Idivision) => ( 
                            divi.upctg !== 0 ? null : 
                            <li key={divi.divisioncode}>{divi.divisionname}</li> 
                        ))}
                    </DiviList>
                    
                </List>

                <List onClick={diviChange}>
                    <Title>
                        <div></div>
                        <div>{selectDivi || "전체 학과"}</div>
                        <img src={arrow} />
                    </Title>
                    <DList display={Dcheck as boolean}>
                        {division?.map((divi:Idivision) => (
                            selectDivision?.upctg === 0 || divi.upctg !== selectDivision?.divisioncode ? null :
                            <li  key={divi.divisioncode} >{divi.divisionname}</li>
                        ))}
                    </DList>
                    
                </List>
                <button>가입하기</button>
            </div>}
            
            
        </Form>
    )
}

export default Register;
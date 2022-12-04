import styled from "styled-components";
import {connect} from "react-redux";
import { add } from "../store";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { Idivision, getCategory, getDivision, Icategory, InewBoard } from "../service/BoardService";
import { useRecoilValue } from "recoil";
import { isPopUp, isSearch } from "../atom";
import Login from "../component/Login";
import Search from "../component/Search";
import Header from "../component/Header";
import arrow from "../img/arrow.jpg";
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import ReactNotification from 'react-notifications-component'
import Footer from "../component/Fotoer";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;

`;
const Container = styled.div<{display:boolean}>`
    /* top: -100px; //header 길이만큼 - */
    width: 100%;
    height: 200vh;
    background-color: rgba(0,0,0,0.8);
    position: relative;
    z-index: 1;
    display: ${(props) => props.display ? 'block' : 'none'};
`
const MainCon = styled.div`
    width: 100%;
    position: absolute;
    z-index: 0;
`

const Form = styled.form`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 150px;
    
`

const TitleForm = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
`
const Select = styled.select`
    width: 200px;
    height: 45px;
    padding: 0 15px;
    border: 1px solid #999;
    background: url(${arrow}) no-repeat 95% 50%; 
    border-radius: 0px; 
    -webkit-appearance: none; 
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    font-weight: bold;
    color:  ${(props) => props.theme.blackWhite};

    &::-ms-expand {
        display: none;
    }
    
`

const Option = styled.option`
    background-color:  ${(props) => props.theme.whiteGrey};;
`

const Input = styled.input`
    color: ${(props) => props.theme.blackWhite};
    width: 70%;
    height: 8vh;
    background: transparent;
    border: none;
    border-bottom: 1px solid #797979;
    font-size: 1.8em;
    font-weight: 700;

    &:focus {outline: none;}
     margin-right: 20px;
    
`
const Text = styled.textarea`
    margin-top: 50px;
    width: 100%;
	height: 300px;
	padding: 10px;
	box-sizing: border-box;
    border: none;
	border-radius: 5px;
	font-size: 16px;
	resize: none;
    box-shadow: 2px 4px 4px 1px rgba(0,0,0,0.4); 
    background-color: ${(props) => props.theme.whiteGrey};
    color: ${(props) => props.theme.blackWhite};
    &:focus {
        outline: solid 2px #95C94A;
    }
    
`
const Btn = styled.button`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;

    & > button{
            font-size: 14px;
            padding: 8px 20px;
            background-color: #F36700;
            color: #ffffff;
            border-radius: 15px;
            margin-right: 10px;
    }
    
    & > button:nth-child(1){
        background: #95C94A;
    }


`


function Write({add}:any){
    const [context, setContext] = useState<String>();
    const [title, setTitle] = useState<String>();
    const [category, setCategory] = useState<Icategory[]>();
    const [selectCate, setSelectCate] = useState<string>("건물");
    const [id, setId] = useState<string>();
    const [division, setDivision] = useState<string>();
    const navigate = useNavigate();
    const Pop = useRecoilValue(isPopUp);
    const search = useRecoilValue(isSearch);
    const ff = false as boolean;
    

    function onChange(event:React.FormEvent<HTMLElement>){
        //학번 제목 내용을 useState에 저장
        const { value } = event.currentTarget as HTMLInputElement;
        const { name } = event.target as HTMLInputElement;
        
        

        switch ( name ){
            case "제목":
                setTitle(value);
                break;

            case "내용":
                setContext(value.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
                break;
        }
    }

    function cateChange(event:React.ChangeEvent<HTMLSelectElement>){
        //카테고리 저장
        setSelectCate(event.target.value);
    }
   
    
    function onSubmit(e:React.FormEvent){
        //store.js로 데이터를 보냄
        e.preventDefault();
        
        if(context?.length === 0 || title?.length === 0 || context === "" || title === "" || context === undefined || title=== undefined || context === undefined || title === undefined){
            store.addNotification({
                title: "게시물 작성 오류!",
                message: "빈칸없이 입력해 주세요!",
                type: "danger",
                insert: "bottom",
                container: "bottom-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                },
                
              });
        }else{
            console.log(division);
            add({studentid: id, title: title, contents:context, category: selectCate, divisioncode: division, lookup: false });
            navigate("/post");
        }
        
    }

    useEffect(() => {
        getCategory().then((value => {
            const cate = [];
            cate.push(value);
            setCategory(cate[0]);
            
        }));

        const user = sessionStorage.getItem("user");
        if(user){
            console.log(JSON.parse(user));
            setId(JSON.parse(user).studentid);
            setDivision(JSON.parse(user).divisioncode);
            
        }


        
    },[]);
    
    return(
        <Wrapper>
            <MainCon>
                <Header check = {false} />
                <Form onSubmit={onSubmit}>
                    <TitleForm>
                        <Input type="text" placeholder="제목" name="제목" onChange={onChange} autoComplete="off"  />
                        <Select onChange={cateChange} value={selectCate}>
                            {category?.map((cate:Icategory, idx:number) => (
                                idx === 0 ? null :
                                <Option key={idx} value={cate.category}>{cate.category}</Option>
                            ))}
                        </Select>
                    </TitleForm>
                    
                   
                    <Text placeholder="내용을 입력하세요" name="내용" onChange={onChange} />
                    
            
                    <Btn>
                        <button onClick={() => navigate('/')}>목록으로</button>
                        <button>작성하기</button>
                    </Btn>
                    
                    
                </Form>
                <Footer />
            </MainCon>
            <Container display={Pop || search}>
                    {Pop ? <Login /> : null}
                    {search ? <Search />: null}
            </Container>
            <ReactNotification />
            
        </Wrapper>
    )
}

function mapDispatchToProps(dispatch:any){
    return{
        add: (context:InewBoard) => dispatch(add(context))
    }
}

export default connect(null, mapDispatchToProps) (Write);

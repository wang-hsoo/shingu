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

const Wrapper = styled.div`
    
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
    position: absolute;
    z-index: 0;
`

const Form = styled.form`
    
`
const Select = styled.select`
    
`

const Option = styled.option`
    
`

const Input = styled.input`
    
`
const Text = styled.textarea`
    
`
const Btn = styled.button`

`


function Write({add}:any){
    const [context, setContext] = useState<String>();
    const [title, setTitle] = useState<String>();
    const [hak, setHak] = useState<String>("");
    const [category, setCategory] = useState<Icategory[]>();
    const [division, setDivision] = useState<Idivision[]>();
    const [selectCate, setSelectCate] = useState<string>("건물");
    const [selectDivision, setSelectDivision] = useState<number>(1);
    const [selectDivi, setSelectDivi] = useState<string>("영상디자인과");
    const navigate = useNavigate();
    const Pop = useRecoilValue(isPopUp);
    const search = useRecoilValue(isSearch);
    

    function onChange(event:React.FormEvent<HTMLElement>){
        //학번 제목 내용을 useState에 저장
        const { value } = event.currentTarget as HTMLInputElement;
        const { name } = event.target as HTMLInputElement;
        
        

        switch ( name ){
            case "학번":
                setHak(value);
                break;

            case "제목":
                setTitle(value);
                break;

            case "내용":
                setContext(value.replace("<br>","\r\n"));
                break;
        }
    }

    function cateChange(event:React.ChangeEvent<HTMLSelectElement>){
        //카테고리 저장
        setSelectCate(event.target.value);
    }
    function divisionChange(event:React.ChangeEvent<HTMLSelectElement>){
        setSelectDivision(Number(event.target.value));
    }
    function diviChange(event:React.ChangeEvent<HTMLSelectElement>){
        setSelectDivi(event.target.value);
    }
    
    function onSubmit(e:React.FormEvent){
        //store.js로 데이터를 보냄
        e.preventDefault();
        if(hak?.length < 10 || context?.length === 0 || title?.length === 0 || context === "" || title === ""){
            console.log("오류");
        }else{
            add({studentid: hak, title: title, contents:context, category: selectCate, divisioncode: selectDivi });
            navigate("/post");
        }
        
    }

    useEffect(() => {
        // setTimeout(() => {
            getCategory().then((value => {
                const cate = [];
                cate.push(value);
                setCategory(cate[0]);
                
            }));

            getDivision().then((value => {
                const divi = [];
                divi.push(value);
                setDivision(divi[0]);
            }));
        // }, 100);

        
    },[]);
    
    return(
        <Wrapper>
            <MainCon>
                <Header />
                <Form onSubmit={onSubmit}>
                    <Select onChange={cateChange} value={selectCate}>
                        {category?.map((cate:Icategory, idx:number) => (
                            idx === 0 ? null :
                            <Option key={idx} value={cate.category}>{cate.category}</Option>
                        ))}
                    </Select>
                    <Select onChange={divisionChange} value={selectDivision}>
                        {division?.map((divi:Idivision) => (
                            divi.upctg !== 0 ? null : 
                            <Option key={divi.divisioncode} value={divi.divisioncode}>{divi.divisionname}</Option> 
                        ))}
                    </Select>
                    <Select onChange={diviChange} value={selectDivi}>
                        {division?.map((divi:Idivision) => (
                            divi.upctg !== selectDivision ? null :
                            <Option key={divi.divisioncode} value={divi.divisionname}>{divi.divisionname}</Option>
                        ))}
                    </Select>
            
                    <Input type="number" placeholder="학번" name="학번" onChange={onChange} />
                    <Input type="text" placeholder="제목" name="제목" onChange={onChange} />
                    <Text placeholder="내용" name="내용" onChange={onChange} />
                    <Btn>작성하기</Btn>
                    <Btn onClick={() => navigate('/')}>목록으로</Btn>
                </Form>
            </MainCon>
            <Container display={Pop || search}>
                    {Pop ? <Login /> : null}
                    {search ? <Search />: null}
            </Container>
        </Wrapper>
    )
}

function mapDispatchToProps(dispatch:any){
    return{
        add: (context:InewBoard) => dispatch(add(context))
    }
}

export default connect(null, mapDispatchToProps) (Write);

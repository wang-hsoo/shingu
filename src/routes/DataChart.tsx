import Header from "../component/Header";
import React, { useEffect, useState } from "react";
import { getBoad, getDivision, Idivision, InewBoard } from "../service/BoardService";
import { useNavigate } from "react-router-dom";
import DateChart from "../component/DateChart";
import MonthChart from "../component/MonthChart";
import SelectPost from "../component/SelectPost";
import styled from "styled-components";
import Footer from "../component/Fotoer";
import { isPopUp, isSearch } from "../atom";
import { useRecoilValue } from "recoil";
import Login from "../component/Login";
import Search from "../component/Search";

const Container = styled.div<{display:boolean}>`
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: rgba(0,0,0,0.8);
    z-index: 1;
    display: ${(props) => props.display ? 'block' : 'none'};
`

const Wrraper = styled.div`
    width: 100%;
`

const Maincon = styled.div`
    width: 100%;
    position: absolute;
    z-index: 0;
`
const ChartMain = styled.div`
    width: 60%;
    padding-top: 120px;
    margin: 0 auto;
`

const ChartHeader = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: flex-end;
    
    & > h1{
        font-size: 24px;
        font-weight: 600;
        margin-right: 20px;
    }

    & > button{
        font: 16px;

        &:hover{
            font-weight: 800;
            transition: .3s;
        }
    }
`

function DataChart(){
    const [adminDivision, setadminDivision] = useState<Idivision>();
    const [selectPage, setSelectPage] = useState<String>("일별차트");
    const [allPost, setAllPost] = useState<InewBoard[]>();
    const Pop = useRecoilValue(isPopUp);
    const search = useRecoilValue(isSearch);
    console.log(search);
    
    const navigate = useNavigate();

    function onClick(event:React.MouseEvent<HTMLButtonElement>){
        setSelectPage(event.currentTarget.value);
    }

    useEffect(() => {
        const admin = sessionStorage.getItem("admin");

        if(!admin){
            navigate('/');
        }
        getDivision().then(vlaue => {
            vlaue.map((division:Idivision) => {
                if(division.divisioncode === Number(admin)){
                    setadminDivision(division);
                }
            })
        })

        getBoad().then(value => {
            setAllPost([...value]);
        })
    },[])
   

    return(
        <Wrraper>
            <Maincon>
                <Header />
                <ChartMain>
                    <ChartHeader>
                        <h1>{adminDivision?.divisionname}</h1>
                        <button onClick={onClick} value="일별차트">일별차트</button>
                        <button onClick={onClick} value="월별차트">월별차트</button>
                        <button onClick={onClick} value="추천게시물">추천게시물</button>
                    </ChartHeader>
                    <div>
                        {selectPage === "일별차트" ? <DateChart post={allPost} division= {adminDivision?.divisionname+""} /> : null}
                        {selectPage === "월별차트" ? <MonthChart post={allPost} /> : null}
                        {selectPage === "추천게시물" ? <SelectPost post={allPost}/> : null}
                    </div>
                </ChartMain>
                <Footer />
            </Maincon>
            <Container display={Pop || search}>
                    {Pop ? <Login /> : null}
                    {search ? <Search />: "하이"}
            </Container>
        </Wrraper>
    )
}

export default DataChart;
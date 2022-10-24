import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCategory, getDivision, Icategory, Idivision, InewBoard } from "../service/BoardService";
import Header from "../component/Header";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isPopUp, isSearch } from "../atom";
import Login from "../component/Login";
import Search from "../component/Search";
import TopPost from "../component/TopPost";
import AllPost from "../component/AllPost";


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
const Div = styled.div`
    background-color: beige;
    padding: 10px 15px;
    border-radius: 10px;
    margin-bottom: 10px;
`


function Home(){
    const [division, setDivision] = useState<Idivision[]>();
    const [category, setCategory] = useState<Icategory[]>();
    const [selectDivi, setSelectDivi] = useState<Idivision>();
    const [selectDivision, setSelectDivision] = useState<Idivision>();
    const [selectCate, setSelectCate] = useState<string>();
    const Pop = useRecoilValue(isPopUp);
    const search = useRecoilValue(isSearch);

    

  

    function divisionChange(event:React.ChangeEvent<HTMLSelectElement>){
        const division = event.target.value.split(",");

            const selectdivi = {
                divisionname: division[0],
                divisioncode: Number(division[1]),
                upctg: Number(division[2])
            }
            setSelectDivision(selectdivi);
            setSelectDivi({
                divisionname: "전체",
                divisioncode: -1,
                upctg: -1
            });
    }
    
    function diviChange(event:React.ChangeEvent<HTMLSelectElement>){
        const division = event.target.value.split(",");

            const selectdivi = {
                divisionname: division[0],
                divisioncode: Number(division[1]),
                upctg: Number(division[2])
            }

            setSelectDivi(selectdivi);
    }

    function selectCategory(event:React.MouseEvent<HTMLButtonElement>){
        setSelectCate(event.currentTarget.value);
    }

    useEffect(() => {
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

        setSelectCate("전체");
    },[])

    

    useEffect(() => {
        setSelectCate("전체");
    },[selectDivision,selectDivi])


    return(
        true ? 
        <div>
                <MainCon>
                    <Header />
                    <div>
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
                    </div>
                    <div>
                        {category?.map((category) => (
                            <button key={category.category} value={category.category} onClick={selectCategory} >{category.category}</button>
                        ))}
                    </div>
                    <TopPost />
                    <AllPost divi={selectDivi} category={selectCate} division={selectDivision} AllDivision = {division} />
                </MainCon>
                <Container display={Pop || search}>
                    {Pop ? <Login /> : null}
                    {search ? <Search />: null}
                </Container>
        </div>  : null
        
    )
}



export default Home;
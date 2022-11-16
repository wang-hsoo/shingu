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
import { useNavigate } from "react-router-dom";
import BannerImg from "../img/main_banner9.png";
import { motion } from "framer-motion";


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

const Banner = styled.div<{bg:string}>`
    width: 100vw;
    height: 618px;
    background-image: url(${(props)=> props.bg});
    background-size: cover;
    display: flex;
    overflow: hidden;
`

const TextBox =styled.div`
    padding-top: 150px;

`
const BannerText = styled(motion.div)`
    width: 1100px;
    margin-left: 100px;
    color: white;
    font-size: 70px;
    font-weight: 800;
    margin-bottom: 10px;
    text-shadow: 4px 2px 2px gray;
`
const GreenBar = styled(motion.div)`
    width: 120px;
    height: 800px;
    margin-top: -100px;
    margin-left: 180px;
    background-color: rgba(149, 201, 74, 0.5);
`
const transition = {
    duration: 0.8,
    ease: [0.6, -0.05, 0.01, 0.9],
  }
  
  const textReveal = {
    initial: {
      x: "200%",
      opacity: 0,
      rotateZ: -30
    },
    animate: {
      x: "0%",
      opacity: 1,
    },
  };

  const greenBar = {
    initial: {
      x: "200%",
      opacity: 0,
      rotateZ: 25
    },
    animate: {
      x: "0%",
      opacity: 1,
    },
  };


function Home(){
    const [division, setDivision] = useState<Idivision[]>();
    const [category, setCategory] = useState<Icategory[]>();
    const [selectDivi, setSelectDivi] = useState<Idivision>();
    const [selectDivision, setSelectDivision] = useState<Idivision>();
    const [selectCate, setSelectCate] = useState<string>();
    const [userLogin, setUserLogin] = useState(false);
    const Pop = useRecoilValue(isPopUp);
    const search = useRecoilValue(isSearch);
    const navigate = useNavigate();

    

  

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

        const admin = sessionStorage.getItem("admin");
        const user = sessionStorage.getItem("user");
        
        if(user){
            setUserLogin(true);
        }
    },[])

    

    useEffect(() => {
        setSelectCate("전체");
    },[selectDivision,selectDivi])


    return(
        true ? 
        <div>
                <MainCon>
                    
                    <Banner bg={BannerImg}>
                        <Header />
                        <TextBox>
                            <BannerText 
                                variants={textReveal}
                                initial="initial"
                                animate="animate"
                                transition={{ ...transition, delay: 0.5}}
                                >
                                내일을 향한 도전
                            </BannerText>
                            <BannerText 
                                variants={textReveal}
                                initial="initial"
                                animate="animate"
                                transition={{ ...transition, delay: 1.1 }}>
                                신구인의 꿈을 응원합니다
                            </BannerText>
                        </TextBox>
                        
                        <GreenBar 
                         variants={greenBar}
                         initial="initial"
                         animate="animate"
                         transition={transition} />
                    </Banner>
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
                    <div>
                        {userLogin ? <button onClick={()=> navigate('/write')}>게시물작성</button> : null}
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
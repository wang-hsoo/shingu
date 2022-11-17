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
import arrow from "../img/arrow.jpg";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import Footer from "../component/Fotoer";


const Container = styled.div<{display:boolean}>`
    width: 100%;
    height: 200vh;
    background-color: rgba(0,0,0,0.8);
    position: relative;
    z-index: 1;
    display: ${(props) => props.display ? 'block' : 'none'};
`
const Wrapper = styled.div`
    width: 100vw;
`
const MainCon = styled.div`
    width: 100%;
    position: absolute;
    z-index: 0;
`

const Banner = styled.div<{bg:string}>`
    width: 100%;
    height: 618px;
    background-image: url(${(props)=> props.bg});
    background-position: center;
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

const SelectDivi = styled(motion.div)<{scroll:boolean}>`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #C9C9C9;
    background-color: white;
    position: ${(props) => props.scroll ? "fixed" : "relative"};

`

const SelectBox = styled.div`
    width: 60%;
    height: 100%;
    margin: 0 auto;
`

const Select = styled.select`
    width: 200px;
    height: 100%;
    padding: .8em .5em; 
    border: 1px solid #999;
    border-bottom: none;
    font-family: inherit;  
    background: url(${arrow}) no-repeat 95% 50%; 
    border-radius: 0px; 
    -webkit-appearance: none; 
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    font-weight: bold;

    &::-ms-expand {
        display: none;
    }
   
    
`

const AllBox = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
`

const AllTitle = styled.div`
    width: 200px;
    font-size: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 700;
    
    & > div{
        margin-top: 5px;
        width: 100px;
        border-bottom: 3px solid #333333;
    }
`

const CateBox = styled.div`
    margin-top: 20px;
    width: 40%;
    display: flex;
    justify-content: space-around;
    & > button{
        width: 100px;
        font-size: 16px;
        color: #989B9C;
        font-weight: 600;

        &:hover{
            color: #333333;
            transition: .3s;
        }
    }
`

const WriteBtn = styled.div`
    width: 60%;
    margin-top: -30px;
    display: flex;
    justify-content: flex-end;
    & > button{
        font-size: 14px;
        padding: 8px 20px;
        background-color: #F36700;
        color: #ffffff;
        border-radius: 15px;
    }
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

  const navVariants = {
    top:{
        backgroundColor: "rgba(255, 255, 255, 0)",
        boxShadow: "none",
        top: "0"
    },
    scroll:{
      backgroundColor:"rgba(255, 255, 255, 1)",
      boxShadow: "0 4px 4px -4px black",
      top: "80px"
    }
  }


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
    const { scrollY } = useViewportScroll();
    const navAnimation = useAnimation();
    const [scroll, setScroll] = useState(false);

    useEffect(()=>{
        scrollY.onChange(() => {
            if(scrollY.get() > 580){
                navAnimation.start("scroll");
                setScroll(true);
                
            }else{
                navAnimation.start("top");
                  setScroll(false);
            }
          })
    },[]);

    

  

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
        <Wrapper>
                <MainCon>
                    
                    <Banner bg={BannerImg}>
                        <Header check={true} />
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

                    <SelectDivi 
                        variants={navVariants}
                        initial="top" 
                        animate={navAnimation}
                        scroll={scroll as boolean} >
                        <SelectBox>
                            <Select onChange={divisionChange}>
                                <option value="전체">전체학부</option>
                                {division?.map((divi:Idivision) => ( 
                                    divi.upctg !== 0 ? null : 
                                    <option key={divi.divisioncode} value={[divi.divisionname, divi.divisioncode+"",  divi.upctg+""]}>{divi.divisionname}</option> 
                                ))}
                            </Select>

                            <Select onChange={diviChange}>
                                <option value="전체">전체학과</option>
                                {division?.map((divi:Idivision) => (
                                    divi.upctg !== selectDivision?.divisioncode ? null :
                                    <option key={divi.divisioncode} value={ [divi.divisionname, divi.divisioncode+"",  divi.upctg+""]}>{divi.divisionname}</option>
                                ))}
                            </Select>

                        </SelectBox>
                        
                    </SelectDivi>

                    <TopPost divi={selectDivi} category={selectCate} division={selectDivision} />

                    <AllBox>
                        <AllTitle>전체 게시물 <div /></AllTitle>


                        <CateBox>
                            {category?.map((category) => (
                                <button key={category.category} value={category.category} onClick={selectCategory} >{category.category}</button>
                            ))}
                        </CateBox>
                        

                        <AllPost divi={selectDivi} category={selectCate} division={selectDivision} AllDivision = {division} />

                        <WriteBtn>
                            {userLogin ? <button onClick={()=> navigate('/write')}>작성하기</button> : null}
                        </WriteBtn>

                    </AllBox>

                    <Footer />
                    
                </MainCon>
                
                <Container display={Pop || search}>
                    {Pop ? <Login /> : null}
                    {search ? <Search />: null}
                </Container>
        </Wrapper>  : null
        
    )
}



export default React.memo(Home);
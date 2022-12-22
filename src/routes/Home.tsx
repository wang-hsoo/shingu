import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { getBoad, getCategory, getDivision, Icategory, Idivision, InewBoard } from "../service/BoardService";
import Header from "../component/Header";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSearch } from "../atom";
import Search from "../component/Search";
import TopPost from "../component/TopPost";
import AllPost from "../component/AllPost";
import { useNavigate } from "react-router-dom";
import BannerImg from "../img/main_banner9.png";
import arrow from "../img/arrow.jpg";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import Footer from "../component/Fotoer";
import AddPost from "../component/AddPost";
import ErrorPage from "../component/ErrorPage";


const Container = styled.div<{display:boolean}>`
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
    position: fixed;
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
    position: relative;
    z-index: 1;
    & > div{
        &:nth-child(1){
            @media screen and (max-width: 850px) {
                margin-top: 150px;
            }

        }
    }
`
const BannerText = styled(motion.div)`
    width: 1100px;
    margin-left: 100px;
    color: white;
    font-size: 4em;
    font-weight: 800;
    margin-bottom: 10px;
    text-shadow: 4px 2px 2px gray;
    @media screen and (max-width: 1400px) {
        width: 800px;
    }
    @media screen and (max-width: 850px) {
        width: 600px;
        font-size: 3em;
    }
    @media screen and (max-width: 600px) {
        margin-left: 0;
    }
`
const GreenBar = styled(motion.div)`
    width: 120px;
    height: 800px;
    margin-top: -100px;
    margin-left: 180px;
    background-color: rgba(149, 201, 74, 0.5);
    @media screen and (max-width: 850px) {
        position: absolute ;
        height: 780px;
    }
`

const SelectDivi = styled(motion.div)<{scroll:boolean}>`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #C9C9C9;
    background-color: ${(props) => props.theme.bgColor};
    position: ${(props) => props.scroll ? "fixed" : "relative"};

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
    color: ${(props) => props.theme.blackWhite};
    & > div{
        margin-top: 5px;
        width: 100px;
        border-bottom: 3px solid ${(props) => props.theme.blackWhite};
    }
`

const CateBox = styled.div`
    width: 60%;
    height: 100%;
    margin:  0 auto;
    display: flex;
    justify-content: space-around;
    @media screen and (max-width: 1400px) {
        width: 80%;
    }
    @media screen and (max-width: 850px) {
        width: 80%;
    }
    @media screen and (max-width: 600px) {
        width: 95%;
    }
    & > button{
        width: 100px;
        font-size: 16px;
        color: ${(props) => props.theme.blackWhite};
        font-weight: 600;

        &:hover{
            color: #333333;
            transition: .3s;
        }
        @media screen and (max-width: 1400px) {
            width: 80%;
            font-size: 15px;
        }
        @media screen and (max-width: 850px) {
            width: 100%;
        }
        @media screen and (max-width: 600px) {
            width: 95%;
            font-size: 13px;
            
        }
    }
`

const WriteBtn = styled.div`
    position: absolute;
    right: 400px;
    bottom: 200px;
    & > button{
        font-size: 14px;
        padding: 8px 20px;
        background-color: #F36700;
        color: #ffffff;
        border-radius: 15px;
    }
    @media screen and (max-width: 1400px) {
        right: 180px;
    } 
    @media screen and (max-width: 850px) {
        right: 80px;
        bottom: 250px;
    }  
    @media screen and (max-width: 600px) {
        right: 50px;
        bottom: 350px;
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
        boxShadow: "none",
        top: "0"
    },
    scroll:{
      boxShadow: "0 4px 4px -4px black",
      top: "80px"
    }
  }


function Home(){
    const [category, setCategory] = useState<Icategory[]>();
    const [divi, setDivi] = useState<String>();
    const [selectCate, setSelectCate] = useState<string>();
    const [userLogin, setUserLogin] = useState(false);
    const search = useRecoilValue(isSearch);
    const navigate = useNavigate();
    const { scrollY } = useViewportScroll();
    const navAnimation = useAnimation();
    const [scroll, setScroll] = useState(false);
    const [allPost, setAllPost] = useState<InewBoard[]>();
    const [loginCheck, setLoginCheck] = useState<Boolean>(false);

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

    


    
    

    function selectCategory(event:React.MouseEvent<HTMLButtonElement>){
        setSelectCate(event.currentTarget.value);
    }

    useEffect(() => {
        getCategory().then((value => {
            const cate = [];
            cate.push(value);
            setCategory(cate[0]);
            
        }));

        setSelectCate("전체");

        const admin = sessionStorage.getItem("admin");
        const user = sessionStorage.getItem("user");
        
        if(user){
            setLoginCheck(true);
            setUserLogin(true);
            const getUser = JSON.parse(user);
            setDivi(getUser.divisioncode.split(',')[1]);
            let getPost = [] as InewBoard[];
            getBoad().then( (value:InewBoard[]) => {
                value.map((board:InewBoard) => {
                    if(board.divisioncode === getUser.divisioncode){
                        getPost.push(board);
                        
    
                    }
                })
                setAllPost(getPost);
            })
        }else if (admin){
            let getPost = [] as InewBoard[];
            setLoginCheck(true);
 
            getDivision().then((value:Idivision[]) => {
                value.map((division:Idivision) => {
                    if(division.divisioncode === Number(admin)){
                        getBoad().then( (boardValue:InewBoard[]) => {
                            boardValue.map((board:InewBoard) => {
                                if(board.divisioncode.split(',')[1] === division.divisionname){
                                    getPost.push(board);
                                    setDivi(division.divisionname);
                                }
                            })
                            setAllPost(getPost);
                        })
                    }
                })
            })
            

        }

       

       
    },[])

    





    return(
        loginCheck ? 
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
                            <CateBox>
                                {category?.map((category) => (
                                    <button key={category.category} value={category.category} onClick={selectCategory} >{category.category}</button>
                                ))}
                            </CateBox>
                    </SelectDivi>

                    <AddPost post = {allPost}  divi= {divi} />

                    <TopPost post = {allPost} category={selectCate} />
                    

                    <AllBox>
                        <AllTitle>전체 게시물 <div /></AllTitle>

                        <AllPost post = {allPost}  category={selectCate}  />

                        <WriteBtn>
                            {userLogin ? <button onClick={()=> navigate('/write')}>작성하기</button> : null}
                        </WriteBtn>

                    </AllBox>

                    <Footer />
                    
                </MainCon>
                
                <Container display={search}>
                    {search ? <Search />: null}
                </Container>
        </Wrapper>  :  <ErrorPage />
        
    )
}



export default React.memo(Home);
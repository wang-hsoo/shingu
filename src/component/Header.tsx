import Shingu from "../img/shingu_logo_white.png";
import ShinguBlack from "../img/shingu_logo_black.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isPopUp, isSearch, isTheme } from "../atom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import styled from "styled-components";
import SearchPNG from "../img/search_white.png";
import SearchPNGBlack from "../img/search_black.png";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import userWhite from "../img/user_white.png";
import userBlack from "../img/user_black.png";
import notifiWhite from "../img/notifications_white.png";
import notifiBlack from "../img/notifications_black.png";
import { Ianswer } from "../service/AnswerService";
import { getDivision, Idivision, InewBoard } from "../service/BoardService";
import { Iuser } from "../service/UserService";

const Wraaper = styled(motion.div)`
    width: 100vw;
    height: 80px;
    top: 0;
    z-index: 99;
    position: fixed;
`

const LayOut = styled.div`
    height: 100%;
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`
const Box = styled.div<{scroll:boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    button{
        margin-left: 5px;
        color: ${(props) => props.scroll ? props.theme.blackWhite : props.theme.white};
        & > img{
            width: 26px;
            height: 26px;
        }
    }
    
`

const Noti = styled.div`

 & > img{
    width: 25px;
    position: relative;
    cursor: pointer;
 }

`
const NotiBox = styled.div`
    width: 300px;
    height: 200px;
    background-color:${props => props.theme.whiteGrey};
    border: 1px solid ${props => props.theme.greyWhite};
    position: absolute;
    right: 80px;
    border-radius: 15px;
    padding: 15px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
    width: 8px;  /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: #95C94A; /* 스크롤바의 색상 */
        border-radius: 15px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상*/
    }
    @media screen and (max-width: 1140px) {
        right: 50px;
    } 
    @media screen and (max-width: 850px) {
       
    } 
    @media screen and (max-width: 550px) {
        
    } 
`
const NotiTitle = styled.div`
    color: ${(props) => props.theme.blackWhite};
    width: 100%;
    padding-bottom: 10px;
    border-bottom: solid 1px ${(props) => props.theme.blackWhite};
    font-size: 15px;
    font: 500;
`
const NotiList = styled.div`
    /* color: ${(props) => props.theme.blackWhite}; */
    color: #ffffff;
    width: 250px;
    padding: 13px 20px;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 10px;
    background-color: #95C94A;
   
`
const NotiCount = styled.span`
    width: 20px;
    height: 20px;
    background-color: #95C94A;
    opacity: 0.9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    position: absolute;
    top: 49%;
    right: 4.1%;
    @media screen and (max-width: 1500px) {
        right: 4.5%;
    }
    @media screen and (max-width: 1150px) {
        right: 5%;
    } 
    @media screen and (max-width: 850px) {
        right: 6%;
    } 
    @media screen and (max-width: 550px) {
        right: 8%;
    } 
`

const Logo = styled.div`
    img{
        width: 159px;
    }
    cursor: pointer;
`

const LoginBtn = styled.button<{scroll:boolean}>`
    color: ${(props) => props.scroll ? '#333333' : '#ffffff'};
    
`
const SearchBtn = styled.button`
    img{
        width: 20px !important;
        height: 20px !important;
    }
`

const navVariants = {
    top:{
        backgroundColor: "rgba(255, 255, 255, 0)",
        boxShadow: "none",
    },
    scroll:{
      backgroundColor:"rgba(255, 255, 255, 1)",
      boxShadow: "0 4px 4px -4px black"
    }
  }

  const navVariantsDark = {
    top:{
        backgroundColor: "rgba(38, 38, 38, 0)",
        boxShadow: "none",
    },
    scroll:{
      backgroundColor:"rgba(38, 38, 38, 1)",
      boxShadow: "0 4px 4px -4px black"
    }
  }

function Header({check}:any){
    const [login, setLogin] = useState(false);
    const [adminLogIn, setAdminLogin] = useState(false);
    const setPopUp = useSetRecoilState(isPopUp);
    const popUp = () => setPopUp((prev) => !prev);
    const setSearch = useSetRecoilState(isSearch);
    const search = () => setSearch((prev) => !prev);
    const [btnName, setBtnName] = useState("홈으로");
    const [btnUrl, setBtnUrl] = useState("/DataChart");
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(false);
    const navAnimation = useAnimation();
    const { scrollY } = useViewportScroll();
    const [scroll, setScroll] = useState(false);
    const isTh = useRecoilValue(isTheme);
    let httpRequest = new XMLHttpRequest();
    const [checkBoard, setCheckBoard] = useState<InewBoard[]>();
    const [notiShow, setNotiSWow] =  useState<boolean>(false);

    useEffect(() => {
        if(check){
            scrollY.onChange(() => {
                if(scrollY.get() > 80){
                    navAnimation.start("scroll");
                    setScroll(true);
                }else{
                  navAnimation.start("top");
                  setScroll(false);
                }
              })

        }else{
 
                navAnimation.start("scroll");
                setScroll(true);
         
        }   
        
      },[])

      

      useEffect(() => {
        if(!httpRequest){
            console.log("오류");
        }else{
            httpRequest.onreadystatechange = getAnswerBoard;
            httpRequest.open('GET','http://localhost:8080/api/board');
            httpRequest.send();
        }
      },[]);
      function getAnswerBoard(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const admin = sessionStorage.getItem("admin");
                const user = sessionStorage.getItem("user");
                const answer = JSON.parse(httpRequest.responseText) as InewBoard[];
                
                if(admin){
                    // let checkPost = [] as InewBoard[];
                    // const whoUser = JSON.parse(admin);
                    
                    // answer.map((value:InewBoard) => {

                    //     getDivision().then(divi=>{
                    //         divi.map((division:Idivision) => {
   
                    //             if(whoUser === division.divisioncode){
                                    
                    //                 if(division.divisionname === value.divisioncode.split(",")[1] ){
                                        
                    //                     if(value.lookup){
                    //                         checkPost.push(value);
                    //                         console.log(value)
                    //                     }
                    //                 }
                                    
                    //             }
                    //         })
                    //     })
              
                        
                    // })
                    
                    // setCheckBoard(checkPost);
                    
                }else if(user){
                    let checkPost = [] as InewBoard[];
                    const whoUser = JSON.parse(user) as Iuser;
                    answer.map((value:InewBoard) => {
              
                        if(whoUser.studentid === value.studentid +"" ){
                            
                            if(!value.lookup){
                                checkPost.push(value);
                            }
                        }
                    })

                    setCheckBoard(checkPost);
                    

                    
                }
            } else {
              alert('request에 뭔가 문제가 있어요.');
            }
          }
        }

      function putNoti(){

      }

    function notiClick(board : InewBoard){
        if(!httpRequest){
            console.log("오류");
        }else{
            httpRequest.onreadystatechange = putNoti;
            httpRequest.open('PUT','http://localhost:8080/api/board/'+board.no);
            httpRequest.setRequestHeader('Content-Type', 'application/json');
            const data = {
                divisioncode: board.divisioncode,
                category: board.category,
                title: board.title,
                contents: board.contents,
                addboard: board.addboard,
                studentid: board.studentid,
                createdtime: board.createdtime,
                counts: board.counts,
                lookup: true
            }
            httpRequest.send(JSON.stringify(data));
        }
    }

      

    function Log(){
        if(login){
            sessionStorage.removeItem("admin");
            sessionStorage.removeItem("user");
            setCheckBoard([]);
            setLogin(false);
            setUser(false);
            navigate('/');
        }else{
            popUp();
        }
    }

    
    
    useEffect(() => {
        const admin = sessionStorage.getItem("admin");
        const user = sessionStorage.getItem("user");
        if(admin){
            setAdminLogin(true);
            setLogin(true);
        }else if(user){
            setLogin(true);
            setUser(true);
        }
    },[])

    useEffect(()=>{
        if(location.pathname === '/DataChart'){
            setBtnName("Main");
            setBtnUrl('/');
        }else{
            setBtnName("관리자 페이지");
            setBtnUrl('/DataChart');
        }
    }, [location])

    useEffect(()=>{
        if(!check){
            navAnimation.start("scroll");
        }
        
       
    },[isTh])

    

    return(
        <Wraaper 
            variants={ isTh ? navVariantsDark : navVariants}
            initial="top" 
            animate={navAnimation} >
            <LayOut>
                <Logo onClick={()=>{
                    navigate('/');
                }}>
                    <img src={scroll ? isTh ? Shingu :  ShinguBlack : Shingu} style={{width: "100px"}} />
                </Logo>

                <Box scroll ={scroll}>
                    
                    {adminLogIn? <button onClick={()=>navigate(btnUrl)} >{btnName}</button> : null}
                    <LoginBtn onClick={Log} scroll ={scroll}>{login ? "LOGOUT" : "LOGIN"}</LoginBtn>
                    {user ? <button onClick={() => navigate('/Mypage')} ><img src={scroll ? isTh ? userWhite : userBlack : userWhite} /></button> : null}
                    {user ? <Noti>
                        <img src={scroll ? isTh ? notifiWhite : notifiBlack : notifiWhite}  onClick={() => setNotiSWow((props) => !props)}/>
                        <NotiCount>{checkBoard?.length}</NotiCount>
                        {notiShow && <NotiBox>
                            <NotiTitle>답변이 왔습니다</NotiTitle>
                            { checkBoard ? checkBoard?.map((board:InewBoard) => (
                                <NotiList> 
                                    <div onClick={() => {
                                        console.log(board.no)
                                        notiClick(board);
                                        navigate(`/post/${board.no}`);
                                        window.location.reload();
                                    }}>{board.title}</div>
                                </NotiList>
                            )) : <div>답변이 없습니다.</div>}    
                        </NotiBox>}
                    </Noti> : null}
                    <SearchBtn onClick={search}><img src={scroll ? isTh ? SearchPNG : SearchPNGBlack : SearchPNG} /></SearchBtn>
                </Box>
                
            </LayOut>
            
        </Wraaper>
    )

}

export default Header;
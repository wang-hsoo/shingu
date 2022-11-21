import Shingu from "../img/shingu_logo_white.png";
import ShinguBlack from "../img/shingu_logo_black.png";
import { useSetRecoilState } from "recoil";
import { isPopUp, isSearch } from "../atom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import styled from "styled-components";
import SearchPNG from "../img/search_white.png";
import SearchPNGBlack from "../img/search_black.png";
import { motion, useAnimation, useViewportScroll } from "framer-motion";

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
    button{
        margin-left: 5px;
        color: ${(props) => props.scroll ? '#333333' : '#ffffff'};
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
        width: 16px;
        height: 16px;
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

    function Log(){
        if(login){
            sessionStorage.removeItem("admin");
            sessionStorage.removeItem("user");
            setLogin(false);
            setUser(false);
            navigate('/');
            window.location.reload();
            
        }else{
            popUp();
        }
    }
    
    useEffect(() => {
        const admin = sessionStorage.getItem("admin");
        const user = sessionStorage.getItem("user");
        if(admin){
            setAdminLogin((prev) => !prev);
            setLogin((prev) => !prev);
        }else if(user){
            setLogin((prev) => !prev);
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


    return(
        <Wraaper 
            variants={navVariants}
            initial="top" 
            animate={navAnimation} >
            <LayOut>
                <Logo onClick={()=>{
                    navigate('/');
                }}>
                    <img src={scroll ? ShinguBlack : Shingu} style={{width: "100px"}} />
                </Logo>

                <Box scroll ={scroll}>
                    {adminLogIn? <button onClick={()=>navigate(btnUrl)} >{btnName}</button> : null}
                    <LoginBtn onClick={Log} scroll ={scroll}>{login ? "LOGOUT" : "LOGIN"}</LoginBtn>
                    {user ? <button onClick={() => navigate('/Mypage')} >내정보</button> : null}
                    <SearchBtn onClick={search}><img src={scroll ? SearchPNGBlack : SearchPNG} /></SearchBtn>
                </Box>
                
            </LayOut>
            
        </Wraaper>
    )

}

export default Header;
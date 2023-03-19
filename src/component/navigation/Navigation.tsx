import { useRecoilValue, useSetRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { useAnimation, useViewportScroll } from "framer-motion";




import notifiWhite from "../img/notifications_white.png";
import notifiBlack from "../img/notifications_black.png";
import Shingu from "../../img/shingu_logo_white.png";
import ShinguBlack from "../../img/shingu_logo_black.png";




import UserNav from "./component/UserNav";

import { Box, LayOut, Logo, Wrapper } from "./styles";
import { isTheme } from "../../store/atom";
import { navVariants, navVariantsDark } from "./Variant";
import { ICheck } from "../../service/Interface";



function Navigation({check}:ICheck){
    const navigate = useNavigate();
    const [Who, setWho] = useState<string>("");

    //스크롤 관련
    const { scrollY } = useViewportScroll();
    const [scroll, setScroll] = React.useState<boolean>(false);
    const navAnimation = useAnimation();

    //Theme 관련
    const isTh = useRecoilValue(isTheme);

    //scroll
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
    
    useEffect(()=>{
        if(!check){
            navAnimation.start("scroll");
        }
    },[isTh])

    useEffect(()=>{
        const user = sessionStorage.getItem("userInfo");
        const admin = sessionStorage.getItem("adminInfo");
        
        if(user === null && admin === null){
            navigate("/", {replace:false});
        }else if (user === null){
            setWho("admin");
        }else if( admin === null){
            setWho("user");
        }
    }, [])


    return(
        <Wrapper 
            variants={ isTh ? navVariantsDark : navVariants }
            initial="top" 
            animate={navAnimation}>
            <LayOut>
                <Logo onClick={()=>{navigate("/")}}>
                    <img src={scroll ? isTh ? Shingu :  ShinguBlack : Shingu} style={{width: "100px"}} />
                </Logo>
                <Box>
                    {Who === "admin" ?<UserNav customProps={{scroll: scroll, who:"admin"}} /> : null}
                    {Who === "user" ? <UserNav customProps={{scroll: scroll, who:"user"}} /> : null }
                </Box>
            </LayOut>
        </Wrapper>
    )

}

export default Navigation;
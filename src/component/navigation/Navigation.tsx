import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { useAnimation, useViewportScroll } from "framer-motion";



import SearchPNG from "../img/search_white.png";
import SearchPNGBlack from "../img/search_black.png";
import userWhite from "../img/user_white.png";
import userBlack from "../img/user_black.png";
import notifiWhite from "../img/notifications_white.png";
import notifiBlack from "../img/notifications_black.png";
import Shingu from "../../img/shingu_logo_white.png";
import ShinguBlack from "../img/shingu_logo_black.png";




import AdminNav from "./component/AdminNav";
import UserNav from "./component/UserNav";



function Navigation({check}:any){
    const navigate = useNavigate();
    const [Who, setWho] = useState<string>("");

    //스크롤 관련
    const { scrollY } = useViewportScroll();
    const [scroll, setScroll] = useState(false);
    const navAnimation = useAnimation();

    
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
        const user = sessionStorage.getItem("userInfo");
        const admin = sessionStorage.getItem("adminInfo");
        
        if(user === null && admin === null){
            navigate("/", {replace:true});
        }else if (user === null){
            setWho("admin");
        }else if( admin === null){
            setWho("user");
        }
    }, [])


    return(
        <div>
            <div onClick={()=>{navigate("/home")}}>
                <img src={Shingu} style={{width: "100px"}} />
            </div>
            <div>
                {Who === "admin" ?<AdminNav /> : null}
                {Who === "user" ? <UserNav /> : null }
            </div>
        </div>
    )

}

export default Navigation;
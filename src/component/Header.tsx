import Shingu from "../img/shingu_logo.jpg";
import { useSetRecoilState } from "recoil";
import { isPopUp } from "../atom";
import { useEffect, useState } from "react";

function Header(){
    const [login, setLogin] = useState(false);
    const setPopUp = useSetRecoilState(isPopUp);
    const popUp = () => setPopUp((prev) => !prev);

    function Log(){
        if(login){
            localStorage.removeItem("admin");
            setLogin(false);
        }else{
            popUp();
        }
    }
    
    useEffect(() => {
        const loginCheck = localStorage.getItem("admin");
        if(loginCheck){
            setLogin((prev) => !prev);
        }
    },[])


    return(
        <div>
            <div><img src={Shingu} style={{width: "100px"}} /></div>
            {login? <div>관리자 페이지</div> : null}
            <button onClick={Log}>{login ? "LOGOUT" : "LOGIN"}</button>
            <button>THEM</button>
            <button onClick={popUp}>search</button>
        </div>
    )

}

export default Header;
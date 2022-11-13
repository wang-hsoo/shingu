import Shingu from "../img/shingu_logo.jpg";
import { useSetRecoilState } from "recoil";
import { isPopUp, isSearch } from "../atom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header(){
    const [login, setLogin] = useState(false);
    const [adminLogIn, setAdminLogin] = useState(false);
    const setPopUp = useSetRecoilState(isPopUp);
    const popUp = () => setPopUp((prev) => !prev);
    const setSearch = useSetRecoilState(isSearch);
    const search = () => setSearch((prev) => !prev);
    const navigate = useNavigate();

    function Log(){
        if(login){
            sessionStorage.removeItem("admin");
            sessionStorage.removeItem("user");
            setLogin(false);
            window.location.reload();
            navigate('/');
            
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
        }
    },[])


    return(
        <div>
            <div onClick={()=>navigate('/')}><img src={Shingu} style={{width: "100px"}} /></div>
            {adminLogIn? <button onClick={()=>navigate('/DataChart')}>관리자 페이지</button> : null}
            <button onClick={Log}>{login ? "LOGOUT" : "LOGIN"}</button>
            <button>THEM</button>
            <button onClick={search}>search</button>
        </div>
    )

}

export default Header;
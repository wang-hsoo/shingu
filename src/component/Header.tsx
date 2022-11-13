import Shingu from "../img/shingu_logo.jpg";
import { useSetRecoilState } from "recoil";
import { isPopUp, isSearch } from "../atom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";

function Header(){
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

    function Log(){
        if(login){
            sessionStorage.removeItem("admin");
            sessionStorage.removeItem("user");
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
        <div>
            <div onClick={()=>navigate('/')}><img src={Shingu} style={{width: "100px"}} /></div>
            {adminLogIn? <button onClick={()=>navigate(btnUrl)}>{btnName}</button> : null}
            <button onClick={Log}>{login ? "LOGOUT" : "LOGIN"}</button>
            {user ? <button onClick={() => navigate('/Mypage')}>내정보</button> : null}
            <button onClick={search}>search</button>
        </div>
    )

}

export default Header;
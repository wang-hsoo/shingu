import { MyComponentProps } from "../Interface";
import { UserBTN, UserWrapper } from "../styles/logout";

import logout_black from "../../../img/logout_black.png";
import logout_white from "../../../img/logout_white.png";
import SearchPNG from "../../../img/search_white.png";
import SearchPNGBlack from "../../../img/search_black.png";
import userWhite from "../../../img/user_white.png";
import userBlack from "../../../img/user_black.png";
import { useNavigate } from "react-router-dom";



function UserNav(props:MyComponentProps){
    const {customProps} = props;
    const { scroll } = customProps;
    const { who } = customProps;
    const navigation = useNavigate();
    
    return(
        <UserWrapper>
            <UserBTN>
                <img src={SearchPNGBlack} />
            </UserBTN>
            <UserBTN>
                <img src={userBlack} />
            </UserBTN>
            <UserBTN onClick={() => {
                sessionStorage.removeItem("adminInfo");
                sessionStorage.removeItem("userInfo");
                navigation("/");
            }}>
                   <img src={logout_black} />
            </UserBTN>
        </UserWrapper>
    )
}

export default UserNav;
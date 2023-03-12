import { MyComponentProps } from "../Interface";
import { LogOutBtn, SearchBtn } from "../styles/logout";





function UserNav(props:MyComponentProps){
    const {customProps} = props;
    const { scroll } = customProps;
    
    return(
        <div>
            <LogOutBtn scroll={scroll} onClick={() => {
                sessionStorage.removeItem("adminInfo");
                sessionStorage.removeItem("userInfo");
                window.location.reload();
            }}>
                    로그아웃
            </LogOutBtn>
        </div>
    )
}

export default UserNav;
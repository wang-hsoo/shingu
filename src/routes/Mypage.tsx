import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isPopUp, isSearch, isTheme, isUserChange } from "../atom";
import Footer from "../component/Fotoer";
import Header from "../component/Header";
import { getBoad, InewBoard } from "../service/BoardService";
import Shingu from "../img/shingu_logo_white.png";
import ShinguBlack from "../img/shingu_logo_black.png";
import Login from "../component/Login";
import Search from "../component/Search";

const Container = styled.div<{display:boolean}>`
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: rgba(0,0,0,0.8);
    z-index: 99;
    display: ${(props) => props.display ? 'block' : 'none'};
`

const Wrapper = styled.div`
    width: 100%;
`
const Maincon = styled.div`
    width: 100%;
    margin-top: 40px;
    position: absolute;
`
const UserInfo = styled.div`
    width: 60%;
    height: 261px;
    margin: 0 auto;
    background-color:  ${(props) => props.theme.greenOpa};
    margin-top: 120px;
    display: flex;
    align-items: center;

`

const User = styled.div`
    width: 30%;
    height: 90%;
    border-right: solid 1.5px ${(props) => props.theme.greyDark};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 80px;
    color: ${(props) => props.theme.blackWhite};

    & > h1{
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    & >h1:nth-child(2){
        font-size: 18px;
    }

    & > div{
        font-size: 16px;
        margin-bottom: 10px;
    }
`

const Theme = styled.form`
    width: 70%;
    color: ${(props) => props.theme.blackWhite};
    display: flex;
    justify-content: space-around;
`

const AllTitle = styled.div`
    width: 220px;
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

const UserPost = styled.div`
    width: 60%;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`



const PostGroup = styled.div`
    
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
`



const PostBox = styled.div`
    width: 350px;
    height: 170;
    border: 3px solid #95C94A;
    padding: 30px 60px;
    cursor: pointer;
    box-shadow: 2px 4px 4px 0px rgba(0,0,0,0.5);
    border-radius: 5px;
    background-color: ${(props) => props.theme.whitePost};

    & > h1{
        font-size: 18px;
        margin-bottom: 10px;
        color: ${(props) => props.theme.blackWhite};
    }

    & > div{
        font-size: 15px;
        color:  #636363;
        margin-bottom: 10px;
    }
`

const ThemImgBox = styled.div<{black:boolean}>`
    display: flex;
    flex-direction: column;
    width: 217px;
    height: 144px;
    background-color: ${(props) => props.black ? "#1D1D1D" : "#ffffff"};
    align-items: center;
    margin-top: 20px;


    & > div{
        width: 100%;
        height: 40px;
        background-color: #95C94A;
    }

    & > img{
        width: 147px;
        margin-top: 35px;
    }
`

const UserUpdate = styled.button`
    padding-left: 180px;
    margin-top: -20px;
    margin-bottom: 20px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    h1{
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
    }
    input{
        width: 300px;
        height: 40px;
        padding: 0 10px;
        margin-bottom: 10px;
        border: 1px solid #ABABAB;
    }

    button{
        background-color: #95C94A;
        color: white;
        padding: 10px 130px;
    }

`



interface IgetUser{
    name: string,
    id: string,
    division: string
}

function Mypage(){
    const [getUser, setGetUser] = useState<IgetUser>();
    const [selectPost, setSelectPost] = useState<InewBoard[]>();
    const navigate = useNavigate();
    const setTheme = useSetRecoilState(isTheme);
    const Pop = useRecoilValue(isPopUp);
    const search = useRecoilValue(isSearch);
    const change = useRecoilValue(isUserChange);
    const setChange = useSetRecoilState(isUserChange);
    const useChange = () => setChange((prev) => !prev);
    
 

    useEffect(()=>{
        const user = sessionStorage.getItem("user");
         if(user){
            setGetUser(JSON.parse(user));
         }
         
         getBoad().then( value =>{
            setSelectPost([...value]);
         })
         
    },[]);

    function ThemeCheck(e:any){
        if(e.target.value === "dark"){
            setTheme(true);
        }else{
            setTheme(false);
        }
    }


    return(
        <Wrapper>
            <Maincon>
                <Header check={false}/>
                <UserInfo>
                    <User>
                        {/* <UserUpdate onClick={useChange}>수정하기</UserUpdate> */}
                        <h1>{getUser?.division.split(',')[0]}</h1> 
                        <h1>{getUser?.division.split(',')[1]}</h1>
                        <div>이름 : {getUser?.name}</div>
                        <div>힉반 : {getUser?.id}</div>
                    </User>
                    <Theme>
                        <div>
                            <input type="radio" id="light" value="light" name="them" onClick={ThemeCheck} />
                            <label>라이트 모드</label>
                            <ThemImgBox black={false}>
                                <div />
                                <img src={ShinguBlack} />
                            </ThemImgBox>
                        </div>

                        <div>
                            <input type="radio" id="dark" value="dark" name="them" onClick={ThemeCheck} />
                            <label>다크 모드</label>
                            <ThemImgBox black={true}>
                                <div />
                                <img src={Shingu} />
                            </ThemImgBox>
                        </div>
                        
                        
                    </Theme>
                </UserInfo>

                
                <UserPost>
                    <AllTitle>작성한 게시물 <div /></AllTitle>
                    <PostGroup>
                        {selectPost && selectPost.map((post:InewBoard) => (
                            post.studentid+"" === getUser?.id ?
                                <PostBox onClick={() => {navigate(`/post/${post.no}`)}}>
                                    <h1>{post.title}</h1>
                                    <div>{post.createdtime?.split('T')[0]}</div>
                                    <div>{post.counts+""}</div>
                                </PostBox> : null
                        ))}
                    </PostGroup>
                    
                </UserPost>

                <Footer />
            </Maincon>
            <Container display={Pop || search || change}>
                    {Pop ? <Login /> : null}
                    {search ? <Search />: null}
                    {/* {change ? 
                    <Form >
                        <h1>유저 정보 수정</h1>
                        <input
                        <input placeholder="비밀번호" autoComplete="off" name="id" />
                        <input type="password" placeholder="비밀번호"   name="pw" />
                        <button>로그인</button>
                    </Form> : null} */}
            </Container>
        </Wrapper>
    )

}


export default Mypage;
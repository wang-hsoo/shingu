import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nodata = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > img{
        width: 300px;
    }
    & > div{
        font-size: 40px;
        font-weight: 700;
        margin-top: 20px;
    }
    & > button{
        font-size: 20px;
        margin-top: 20px;
        background-color: #95C94A;
        padding: 20px 40px;
        border-radius: 15px;
        color: #ffffff;
        font-weight: 500;
    }
`

function ErrorPage(){
    const navigate = useNavigate();


    return(
        <Nodata>
            <img src="https://www.shingu.ac.kr/sgu/img/common/ico_error.png" />
            <div>요청하신 페이지를 찾을 수 없습니다.</div>
            <button onClick={() => navigate('/')}>메인으로 가기</button>
        </Nodata>
    )
}

export default ErrorPage;
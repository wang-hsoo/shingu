import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(lightCyan, skyBlue, deepSkyBlue);
`

export const LoginBox = styled.div`
    width: 1000px;
    height: 450px;
    background-color: #ffffff;
    display: flex;
    align-items: center;


    & > div:nth-child(1){
        height: 80%;
        border-right: 3px solid #9D9D9D;
    }
`

export const LoginInput = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
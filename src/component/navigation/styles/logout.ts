import styled from "styled-components";


export const UserWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > div:nth-child(2) > img{
        width: 25px;
        height: 25px;
    }
`

export const UserBTN = styled.div`
    margin-left: 15px;
    img{
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`

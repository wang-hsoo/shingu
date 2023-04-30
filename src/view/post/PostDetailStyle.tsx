import { motion } from "framer-motion";
import styled from "styled-components";


export const PostWrapper = styled.div`
    width: 100vw;
`
export const MainCon = styled.div`
    width: 100%;
    position: absolute;
    z-index: 0;
`

export const Content = styled.div`
    margin-top: 80px;
`

export const Banner = styled.div<{bg:string}>`
    width: 100%;
    height: 205px;
    background-image: url(${(props)=> props.bg});
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    & > div{
        color: white;
        margin-top: 40px;
        font-size: 35px;
        font-weight: 700;
        transform: rotate(-13deg);
    }
`

export const QnaCon = styled.div`
    width: 60%;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

export const TItle = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border-bottom: 2px solid ${(props) => props.theme.blackWhite};
    margin-bottom: 15px;
    & > div{
        color: ${(props) => props.theme.blackWhite};
        margin-bottom: 5px;
        font-size: 32px;
    }
`

export const Info = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > div:nth-child(1){
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }
    & > div > div{
        color: ${(props) => props.theme.greyWhite};
        font-size: 18px;
        margin-right: 10px;
    }
`

export const FavoriteBtn = styled(motion.div)`
width: 40px;
height: 40px;
& > img{
    width: 100%;
    height: 100%;
    cursor: pointer;
}
`

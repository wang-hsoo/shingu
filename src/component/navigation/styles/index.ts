import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
    width: 100vw;
    height: 80px;
    top: 0;
    z-index: 99;
    position: fixed
`

export const LayOut = styled.div`
    height: 100%;
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`

export const Logo = styled.div`
    img{
        width: 159px;
    }
    cursor: pointer;
`


export const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
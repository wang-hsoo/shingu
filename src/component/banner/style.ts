import { motion } from "framer-motion";
import styled from "styled-components";

export const Banner = styled.div<{bg:string}>`
    width: 100%;
    height: 618px;
    background-image: url(${(props)=> props.bg});
    background-position: center;
    background-size: cover;
    display: flex;
    overflow: hidden;
`

export const TextBox =styled.div`
    padding-top: 150px;
    position: relative;
    z-index: 1;
    & > div{
        &:nth-child(1){
            @media screen and (max-width: 850px) {
                margin-top: 150px;
            }

        }
    }
`
export const BannerText = styled(motion.div)`
    width: 1100px;
    margin-left: 100px;
    color: white;
    font-size: 4em;
    font-weight: 800;
    margin-bottom: 10px;
    text-shadow: 4px 2px 2px gray;
    @media screen and (max-width: 1400px) {
        width: 800px;
    }
    @media screen and (max-width: 850px) {
        width: 600px;
        font-size: 3em;
    }
    @media screen and (max-width: 600px) {
        margin-left: 0;
    }
`
export const GreenBar = styled(motion.div)`
    width: 120px;
    height: 800px;
    margin-top: -100px;
    margin-left: 180px;
    background-color: rgba(149, 201, 74, 0.5);
    @media screen and (max-width: 850px) {
        position: absolute ;
        height: 780px;
    }
`
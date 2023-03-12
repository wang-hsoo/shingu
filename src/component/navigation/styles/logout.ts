import styled from "styled-components";


export const LogOutBtn = styled.div<{scroll:boolean}>`
    margin-left: 5px;
    color: ${(props) => props.scroll ? props.theme.blackWhite : props.theme.white};
`

export const SearchBtn = styled.button`
    img{
        width: 20px !important;
        height: 20px !important;
    }
`
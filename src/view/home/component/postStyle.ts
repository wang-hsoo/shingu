import styled from "styled-components";

export const PostWrapper = styled.div`
    width: 60%;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 4px 4px 1px black;
    
`
export const PostArea = styled.div`
    width: 100%;
` 

export const AllTitle = styled.div`
    width: 100%;
    height: 50px;
    background-color: ${(props) => props.theme.greenDark};
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
`

export const PostBox = styled.div`
    background-color:  ${(props) => props.theme.whiteGrey};
    width: 100%;
    height: 180px;
    border: 1px solid ${(props) => props.theme.whiteGrey};;
    border-right: none;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 400px;
    }
    
    & > div{
        width: 25%;
        border-right: solid 1px #C9C9C9;
        padding-bottom: 20px;
        @media screen and (max-width: 600px) {
            width: 100%;
            height: 100%;
            border: solid 1px #c9c9c9;
        }
        
        & > div{
            color: ${(props) => props.theme.blackWhite};
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 500;
            font-size: 18px;
            padding: 30px 20px;
            & > button{
            color: ${(props) => props.theme.blackWhite};
        }
            
        }
        
    }
`
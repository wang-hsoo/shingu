import styled from "styled-components";


export const Wrraper = styled.div`
    margin-top: 40px;
    width: 60%;
`

export const PostBox = styled.div`
    width: 100%;
`

export const Title = styled.div`
    width: 100%;
    height: 50px;
    background-color: #95C94A;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;

    & > div:nth-child(1){
        width: 320px;
        text-align: center;
    }

    & > div{
        width: 100px;
        text-align: center;
    }
`

export const Post = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #C9C9C9;
    justify-content: space-around;
    color: ${(props) => props.theme.blackWhite};
    cursor: pointer;
    & > h1{
        width: 320px;
        text-align: center;
    }
    & > div{
        width: 100px;
        text-align: center;
    }
`

export const NoData = styled.div`
    width: 100%;
    height: 500px;
    background-color: ${(props) => props.theme.bgColor};
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 4px 4px 1px black;
    & > img{
        width: 100px;
        height: 100px;
        margin-bottom: 30px;
    }

    & > div{
        color: ${(props) => props.theme.blackWhite};
    }
`
export const PaginationBox = styled.div`
  .pagination { display: flex; justify-content: center; margin-top: 15px;}
  ul { list-style: none; padding: 0; }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; 
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #95C94A; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #95C94A; }
  ul.pagination li a:hover,
  ul.pagination li a.active { color: #95C94A; }
`
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isSearch } from "../atom";
import SearchBtn from "../img/search_white.png";

const Wrraper = styled.div`
    width: 50%;
    text-align: center;
    margin: 0 auto;
    padding-top: 15%;
    margin-left: 25%;
    position: fixed;

    form{
        width: 90%;
        display: flex;
        border-bottom: 2px solid #ffffff;
    }
    input{
        color: white;
        width: 90%;
        height: 8vh;
        background: transparent;
        border: none;
        font-size: 1.8em;
        font-weight: 700;
    }
    input:focus {outline: none;}
    form > button > img{
        width: 3em;
        height: 3em;
    }

`

const DelectBtn = styled.button`
    font-size: 40px;
    color: white;
    padding-bottom: 2%;
    padding-left: 90%;
`

function Search(){
    const [clickSearch, setClickSearch] = useState<string>();
    const navigate = useNavigate();
    const setSearch = useSetRecoilState(isSearch);
    const search = () => setSearch((prev) => !prev);

    function onChange(event:React.FormEvent<HTMLElement>){
        const { value } = event.currentTarget as HTMLInputElement;
        setClickSearch(value);
    }

    function onSubmit(event:React.FormEvent){
        event.preventDefault();
        console.log("하이");
        if(clickSearch === undefined || clickSearch === " "){
            console.log("오류ㅜ")
        }else{
            navigate(`/${clickSearch}`);
            search();
            window.location.reload();
        }
    }

    return(
        <Wrraper >
            <DelectBtn onClick={search}>X</DelectBtn>
            <form onSubmit={onSubmit}>
                <input placeholder="무엇이 궁금하세요" onChange={onChange} />
                <button><img src={SearchBtn}/></button>
            </form>
        </Wrraper>
    )
}

export default Search;
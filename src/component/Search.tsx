import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isSearch } from "../atom";

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
        if(clickSearch === undefined || clickSearch === " "){
            console.log("오류ㅜ")
        }else{
            navigate(`/${clickSearch}`);
            search();
            window.location.reload();
        }
    }

    return(
        <form onSubmit={onSubmit}>
            <input placeholder="무엇이 궁금하세요" onChange={onChange} />
            <button>검색</button>
            <button onClick={search}>X</button>
        </form>
    )
}

export default Search;
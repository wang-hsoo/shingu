import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isSearch, isUserPost } from "../atom";

function UserSearch(){
    const [clickSearch, setClickSearch] = useState<string>();
    const navigate = useNavigate();
    const setSearch = useSetRecoilState(isUserPost);
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
            <input type="number" placeholder="학번" onChange={onChange} />
            <button>검색</button>
            <button onClick={search}>X</button>
        </form>
    )
}

export default UserSearch;
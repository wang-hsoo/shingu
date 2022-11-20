import Header from "../component/Header";
import React, { useEffect, useState } from "react";
import { getBoad, getDivision, Idivision, InewBoard } from "../service/BoardService";
import { useNavigate } from "react-router-dom";
import DateChart from "../component/DateChart";
import MonthChart from "../component/MonthChart";
import SelectPost from "../component/SelectPost";

function DataChart(){
    const [adminDivision, setadminDivision] = useState<Idivision>();
    const [selectPage, setSelectPage] = useState<String>("일별차트");
    const [allPost, setAllPost] = useState<InewBoard[]>();
    
    const navigate = useNavigate();

    function onClick(event:React.MouseEvent<HTMLButtonElement>){
        setSelectPage(event.currentTarget.value);
    }

    useEffect(() => {
        const admin = sessionStorage.getItem("admin");

        if(!admin){
            navigate('/');
        }
        getDivision().then(vlaue => {
            vlaue.map((division:Idivision) => {
                if(division.divisioncode === Number(admin)){
                    setadminDivision(division);
                }
            })
        })

        getBoad().then(value => {
            setAllPost([...value]);
        })
    },[])
   

    return(
        <div>
            <Header />
            <h1>{adminDivision?.divisionname}</h1>
            <button onClick={onClick} value="일별차트">일별차트</button>
            <button onClick={onClick} value="월별차트">월별차트</button>
            <button onClick={onClick} value="추천게시물">추천게시물</button>

            {selectPage === "일별차트" ? <DateChart post={allPost} division= {adminDivision?.divisionname+""} /> : null}
            {selectPage === "월별차트" ? <MonthChart post={allPost} /> : null}
            {selectPage === "추천게시물" ? <SelectPost post={allPost}/> : null}
        </div>
    )
}

export default DataChart;
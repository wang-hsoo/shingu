import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBoad, Icategory, InewBoard } from "../service/BoardService";

function TopPost( {divi /*학과*/,category,division}:any){



   
    return(
        <div>
            <h1>인기 게시물</h1>
        </div>
    )
}


export default TopPost;
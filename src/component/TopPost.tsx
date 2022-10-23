import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { InewBoard } from "../service/BoardService";

function TopPost( {post}:any){
    const [countPost, setCountPost] = useState<InewBoard[]>();

    useEffect(()=>{
        // setCountPost(post.sort((a:InewBoard,b:InewBoard) =>(Number(b.counts )- Number(a.counts))).slice(0,4));
        // const newPost = [...post];
        
        // const sortArray = newPost.sort((a:InewBoard,b:InewBoard) =>(Number(b.counts )- Number(a.counts))).slice(0,4);
        // setCountPost(sortArray);
    },[])

    return(
        <div>
            <h1>인기 게시물</h1>
        </div>
    )
}

function mapStateToProps(state:InewBoard[]){
    return {post: state[0]}
}

export default connect(mapStateToProps) (TopPost);
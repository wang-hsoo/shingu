import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { rootAdd } from "../store";
import { InewBoard } from "../service/BoardService";
import { useParams } from "react-router-dom";

function Post({post}:any){
    const [getPost, setPost] = useState<InewBoard>();
    let { no } = useParams();
    
    useEffect(() => {
        if(no === undefined){
            setPost(post[0]);
        }
    },[])
    return(
        <div>
            <div>게시물</div>
            <div>{getPost?.title}</div>
            <div>{getPost?.studentid}</div>
            <div>{getPost?.contents}</div>
            <div>{getPost?.addboard}</div>
            <div>{getPost?.category}</div>
            <div>{getPost?.divisioncode}</div>
        </div>
    )
}

function mapStateToProps(state:InewBoard){
    return {post: state}
}

function mapDispatchToProps(dispatch:any){
    return{
        
    }
}



export default connect(mapStateToProps, mapDispatchToProps) (Post);
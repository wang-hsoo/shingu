import { connect } from "react-redux";
import { Idivision, InewBoard } from "../service/BoardService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllPost({post, divi, division, category, AllDivision}:any){
    const [selectPost, setPost] = useState<InewBoard[]>();
    const navigate = useNavigate();

    function categoryPost(post:InewBoard[]){
        let catePost = [] as InewBoard[];
        post?.map((post)=>{
            if(post.category === category){
                catePost.push(post);
            }
        })
        setPost(catePost)
    }
    
    useEffect(()=>{
        setTimeout(()=>{
            setPost(post);
        },1000);
    },[post]);

    useEffect(()=>{
        if(division?.divisionname === "전체" || division === undefined){
            if(category === "전체"){
                setPost(post);
            }else{
                categoryPost(post);
            }
        }else{

            let divisionKey = 0;
            let divionArray = [] as String[];
            AllDivision?.map((divi:Idivision)=>{
                if(division.divisionname === divi.divisionname){
                    divisionKey = divi.divisioncode;
                }
                if(divi.upctg === divisionKey){
                    divionArray.push(divi.divisionname);
                }
            })
            let selectPost = [] as InewBoard[];
            post?.map((post:InewBoard)=>{
                divionArray?.map((division)=>{
                    if(post.divisioncode === division){
                        selectPost.push(post);
                    }
                })
            })
            if(category === "전체"){
                setPost(selectPost);
            }else{
                categoryPost(selectPost);
            }

        }

    },[division,category])//학부

    useEffect(()=>{
        if(divi?.divisionname === "전체" || divi === undefined){

        }else{
            let selPost = [] as InewBoard[];
            post?.map((post:InewBoard)=>{
                if(post.divisioncode === divi.divisionname){
                    selPost.push(post);
                }
            })
             if(category === "전체"){
                 setPost(selPost);
             }else{
                categoryPost(selPost);
             }
        }
        
    },[divi, category])//학과

    return(
        <div>
            {post && selectPost ? 
            <>
                <h1>전체 게시물</h1>
                {selectPost?.map((post)=>(
                    <div onClick={() => navigate(`/post/${post.no}`)} key={post.no}>
                        <h1>{post.title}</h1>
                        <div>{post.divisioncode}</div>
                    </div>
                ))}
            </> : <div>데이터 없음</div>}
        
        </div>
    )
}

function mapStateToProps(state:InewBoard[]){
    return {post: state[0]}
}

export default connect(mapStateToProps) (AllPost);
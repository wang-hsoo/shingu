import { connect } from "react-redux";
import { Idivision, InewBoard } from "../service/BoardService";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
    display: inline-block;
    cursor: pointer;
    margin-top: 10px;
`
                               
function AllPost({post, divi/*학과*/, division/*학부*/, category, AllDivision}:any){
    const [selectPost, setPost] = useState<InewBoard[]>();
    const [firstPost, setFirstPost] = useState<InewBoard[]>();
    const [pages, setPages] = useState<Number[]>([]);
    const [clickPage, setClickPage] = useState<Number>(1);
    const navigate = useNavigate();
    const {title} = useParams();
    
    function resetPost(){
        const getPost = [...post].reverse();
        setPost(getPost);
    }

    function categpryPost(getPost:InewBoard[], category:string){
        const selPost = [] as InewBoard[];
        getPost.map((post:InewBoard) => {
            if(post.category === category){
                selPost.push(post);
            }
        })

        setPost(selPost);
    }

    useEffect(()=>{
        
        const getPost = [...post].reverse();
        const searchPost = [] as InewBoard[];
        if(title){
            
            getPost.map((post:InewBoard) => {
                console.log(post.title);
                if(post.title.includes(title)){
                    searchPost.push(post);
                }
            })
            setFirstPost(searchPost);
            if(category === "전체"){
                setPost(searchPost);
            }else{
                categpryPost(searchPost, category);
            }
        }else{
            setFirstPost(getPost);
            if(category === "전체"){
                setPost(getPost);
            }else{
                categpryPost(getPost, category);
            }
            
            
        }
    },[post,category]);

    useEffect(()=>{
        const divisionPost = [] as InewBoard[];
        
        if(division?.divisionname === "전체"){
           
        }else if(division !== undefined  || divi?.divisionname === "전체"){
            firstPost?.map((post:InewBoard)=> {
                const dd = post.divisioncode.split(',');
                if(dd[0] === division.divisionname){
                    divisionPost.push(post);
                }
            })
            if(category === "전체"){
                setPost(divisionPost);
            }else{
                categpryPost(divisionPost, category);
            }

            
        }
    },[division, divi, category])

    useEffect(()=>{
        const divisionPost = [] as InewBoard[];

        if(divi !== undefined && divi.divisionname !== "전체"){

            post.map((post:InewBoard)=>{
                
                const dd = post.divisioncode.split(',');

                if(dd[1] === divi?.divisionname){
                    
                    divisionPost.push(post);
                }
            })

            if(category === "전체"){
                setPost(divisionPost.reverse());
            }else{
                categpryPost(divisionPost, category);
            }

            
        }
    },[divi])

    
    

    
    return(
        <div>
            <h1>전체 게시물</h1>
            {selectPost?.length !== 0 ? 
            <>
                {selectPost?.map((post, idx)=>(
                    (Number(clickPage) - 1) * 10 <= idx && Number(clickPage) * 10 - 1 >= idx ?
                    <div onClick={() => navigate(`/post/${post.no}`)} key={idx}>
                        <h1>{post.title}</h1>
                        <div>{post.divisioncode.split(',')[1]}</div>
                    </div> : null
                ))}
                {pages.map((pages) => (
                            <Page key={pages+""} onClick={() => setClickPage(pages)}>{pages+""}</Page>
                        ))} 
            </> : <div>데이터 없음</div>}
        
        </div>
    )
}

function mapStateToProps(state:InewBoard[]){
    return {post: state}
}

export default connect(mapStateToProps) (AllPost);
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getBoad, Icategory, InewBoard } from "../service/BoardService";
import AllPost from "./AllPost";

const Wrapper = styled.div`
    width: 60%;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 4px 4px 1px black;
`

const AllTitle = styled.div`
    width: 100%;
    height: 50px;
    background-color: #95C94A;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;

`

const PostBox = styled.div`
    width: 100%;
    height: 180px;
    border: 1px solid #C9C9C9;
    border-right: none;
    display: flex;
    justify-content: space-between;
    

    & > div{
        width: 25%;
        border-right: solid 1px #C9C9C9;
        
        & > div{
            font-weight: 500;
            font-size: 18px;
            padding: 30px 20px;
            
        }

        & > button{
            padding-top: 50px;
            padding-left: 200px
        }
    }
`

const Nodata = styled.div`
    height: 100%;
    height: 178px;
`

function TopPost( {post, divi, /*학과*/category,division}:any){
    const [newBoard, setNewBoard] = useState<InewBoard[]>();
    const [allPost, setAllpost] = useState<InewBoard[]>();
    const navigate = useNavigate();

    useEffect(()=>{
        setAllpost(post);
    },[post]);

    useEffect(()=>{
        
        
        if(allPost){

            let getPost = [] as InewBoard[];

            if(division === undefined || division.divisionname === "전체"){
                if(category === "전체"){
                    getPost.push(...allPost as InewBoard[]);
                }else{
                    allPost?.map((post:InewBoard) => {
                        if(post.category === category){
                            getPost.push(post);
                        }
                    })
                }
            }else{
                if(divi.divisionname === "전체" || divi === undefined){
                    if(category === "전체"){
                        allPost?.map((post:InewBoard)=>{
                            if(post.divisioncode.split(',')[0] === division.divisionname){
                                getPost.push(post);
                            }
                        })
                    }else{
                        allPost?.map((post:InewBoard) => {
                            if(post?.divisioncode.split(',')[0] === division.divisionname){
                                if(post?.category === category){
                                    getPost.push(post);
                                }
                            }
                        })
                    }
                    
                }else{
                    if(category === "전체"){
                        allPost?.map((post:InewBoard)=>{
                            if(post.divisioncode.split(',')[1] === divi.divisionname){
                                getPost.push(post);
                            }
                        })
                    }else{
                        allPost?.map((post:InewBoard) => {
                            if(post.divisioncode.split(',')[1] === divi.divisionname){
                                if(post.category === category){
                                    getPost.push(post);
                                    
                                }
                            }
                        })
                    }

                    
                    
                }

            }

            const sortArray = getPost.sort((a:InewBoard,b:InewBoard) =>(Number(b.counts )- Number(a.counts))).slice(0,4);

           
            

            if(sortArray.length === 0 || sortArray.length === 4){
                setNewBoard(sortArray);
            }else{
                const post = [...sortArray];
                for(post.length; post.length < 4; ){
                    const a = {
                        no: -1,
                        divisioncode: `${division},${divi}`,
                        category: category,
                        title: "",
                        contents: "",
                        addboard: false,
                        studentid: 0,
                        createdtime: "",
                        counts: 0
                    }

                    post.push(a);
                    
                    
                }
                setNewBoard(post);
                
            }
            
        }else{

        }


        
    },[allPost,division, divi, category])

 



   
    return(
        <Wrapper>
           <AllTitle>많이 본 게시물</AllTitle>
           
            {newBoard?.length !== 0 ? 
                 <PostBox>
                    {newBoard?.map((post:InewBoard) => (
                        <div>
                            <div>{post?.title}</div>
                            { post?.no !== -1 ? <button onClick={()=> navigate(`/post/${post.no}`)}>More</button> : null}
                        </div>
                    ))} 
                </PostBox> : <Nodata>게시물 없음</Nodata>}
            
        </Wrapper>
    )
}


export default TopPost;
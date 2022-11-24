import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { InewBoard } from "../service/BoardService";

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
    background-color: ${(props) => props.theme.greenDark};
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
`

const PostBox = styled.div`
    width: 100%;
    height: 180px;
    border: 1px solid ${(props) => props.theme.whiteGrey};
    border-right: none;
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.theme.whiteGrey};
    & > div{
        width: 25%;
        border-right: solid 1px #C9C9C9;
        
        & > div{
            color: ${(props) => props.theme.blackWhite};
            font-weight: 500;
            font-size: 18px;
            padding: 30px 20px;
            
        }
        & > button{
            color: ${(props) => props.theme.blackWhite};
            padding-top: 50px;
            padding-left: 200px
        }
    }
`

const Nodata = styled.div`
    height: 100%;
    height: 178px;
`

function AddPost({post, divi}:any){
    const [showPost, setShowPost] = useState(false);
    const [getPost, setGetPost] = useState<InewBoard[]>();
    const navigate = useNavigate();

    useEffect(()=>{
        if(divi === undefined || divi.divisionname === "전체"){
            setShowPost(false);
        }else{
            
            let showPost = [] as InewBoard[];
            post?.map((post:InewBoard)=>{
                if(post?.divisioncode?.split(',')[1] === divi.divisionname){
                    if(post.addboard === true){
                        showPost.push(post);
                    }
                }
                
            });

            if(showPost.length === 0 || showPost.length === 4){
                setGetPost(showPost);
            }else{
                const post = [...showPost];
                for(post.length; post.length < 4; ){
                    const a = {
                        no: -1,
                        divisioncode: ``,
                        category: "",
                        title: "",
                        contents: "",
                        addboard: false,
                        studentid: 0,
                        createdtime: "",
                        counts: 0
                    }

                    post.push(a);
                    
                    
                }
                setGetPost(post);
                
            }
            setShowPost(true);
        }
    },[divi])

    

    return(
        showPost ? 
            <Wrapper>
                <AllTitle>추천 게시물</AllTitle>

                
                
                {getPost?.length !== 0 ? 
                    <PostBox>
                        {getPost?.map((post:InewBoard) => (
                            <div>
                                <div>{post?.title}</div>
                                { post?.no !== -1 ? <button onClick={()=> navigate(`/post/${post.no}`)}>More</button> : null}
                            </div>
                        ))} 
                    </PostBox> : <Nodata>게시물 없음</Nodata>}
            
            </Wrapper>: null
    )
}

export default AddPost;
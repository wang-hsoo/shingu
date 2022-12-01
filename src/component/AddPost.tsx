import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { InewBoard } from "../service/BoardService";
import NullWhite from "../img/null_white.png";
import NullBlack from "../img/null_black.png";
import { isTheme } from "../atom";
import { useRecoilValue } from "recoil";

const Wrapper = styled.div`
    width: 60%;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 4px 4px 1px black;
    @media screen and (max-width: 1400px) {
        width: 80%;
    }
    @media screen and (max-width: 850px) {
        width: 90%;
    }
    @media screen and (max-width: 600px) {
        width: 95%;
    }
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
    @media screen and (max-width: 600px) {
        display: grid ;
        grid-template-columns: 1fr 1fr;
        height: 400px;
    }
    & > div{
        width: 25%;
        border-right: solid 1px #C9C9C9;

        @media screen and (max-width: 600px) {
            width: 100%;
            height: 100%;
            border: solid 1px #C9C9C9;
        }
        
        & > div{
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: ${(props) => props.theme.blackWhite};
            font-weight: 500;
            font-size: 18px;
            padding: 30px 20px;

            & > button{
                color: ${(props) => props.theme.blackWhite};
                
            }
            
        }
        
    }
`

const Nodata = styled.div`
    height: 100%;
    height: 178px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > img{
        width: 100px;
        height: 100px;
        margin-bottom: 15px;
    }

    & > div{
        color: ${(props) => props.theme.blackWhite};
    }
`

function AddPost({post, divi}:any){
    const [showPost, setShowPost] = useState(false);
    const [getPost, setGetPost] = useState<InewBoard[]>();
    const navigate = useNavigate();
    const isTh = useRecoilValue(isTheme);

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
                                <div>
                                    <div>{post.createdtime?.split('T')[0]}</div>
                                    { post?.no !== -1 ? <button onClick={()=> navigate(`/post/${post.no}`)}>More</button> : null}
                                </div>
                            </div>
                        ))} 
                    </PostBox> : 
                    <Nodata>
                        <img src={isTh ? NullWhite : NullBlack} />
                        <div>작성된 게시물이 없습니다.</div>    
                    </Nodata>}
            
            </Wrapper>: null
    )
}

export default AddPost;
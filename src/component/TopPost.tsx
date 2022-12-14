import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getBoad, Icategory, InewBoard } from "../service/BoardService";
import AllPost from "./AllPost";
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
    background-color:  ${(props) => props.theme.whiteGrey};
    width: 100%;
    height: 180px;
    border: 1px solid ${(props) => props.theme.whiteGrey};;
    border-right: none;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 400px;
    }
    
    & > div{
        width: 25%;
        border-right: solid 1px #C9C9C9;
        padding-bottom: 20px;
        @media screen and (max-width: 600px) {
            width: 100%;
            height: 100%;
            border: solid 1px #c9c9c9;
        }
        
        & > div{
            color: ${(props) => props.theme.blackWhite};
            display: flex;
            align-items: center;
            justify-content: space-between;
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

function TopPost( {post, divi, /*??????*/category,division}:any){
    const [newBoard, setNewBoard] = useState<InewBoard[]>();
    const [allPost, setAllpost] = useState<InewBoard[]>();
    const navigate = useNavigate();
    const isTh = useRecoilValue(isTheme);

    useEffect(()=>{
        setAllpost(post);
    },[post]);

    useEffect(()=>{
        
        
        if(allPost){

            let getPost = [] as InewBoard[];

            if(division === undefined || division.divisionname === "??????"){
                if(category === "??????"){
                    getPost.push(...allPost as InewBoard[]);
                }else{
                    allPost?.map((post:InewBoard) => {
                        if(post.category === category){
                            getPost.push(post);
                        }
                    })
                }
            }else{
                if(divi.divisionname === "??????" || divi === undefined){
                    if(category === "??????"){
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
                    if(category === "??????"){
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
                        counts: 0,
                        lookup: false
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
           <AllTitle>?????? ??? ?????????</AllTitle>
           
            {newBoard?.length !== 0 ? 
                 <PostBox>
                    {newBoard?.map((post:InewBoard) => (
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
                    <div>????????? ???????????? ????????????.</div>    
                </Nodata>}
            
        </Wrapper>
    )
}


export default TopPost;
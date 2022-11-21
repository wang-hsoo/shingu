import { connect } from "react-redux";
import { Idivision, InewBoard } from "../service/BoardService";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrraper = styled.div`
    margin-top: 40px;
    width: 60%;
`

const PostBox = styled.div`
    width: 100%;
`

const Title = styled.div`
    width: 100%;
    height: 50px;
    background-color: #95C94A;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;

    & > div:nth-child(1){
        width: 320px;
        text-align: center;
    }

    & > div{
        width: 100px;
        text-align: center;
    }
`

const Post = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #C9C9C9;
    justify-content: space-around;
    color: ${(props) => props.theme.blackWhite};
    cursor: pointer;
    & > h1{
        width: 320px;
        text-align: center;
    }
    & > div{
        width: 100px;
        text-align: center;
    }
`
const PageBox = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Page = styled.div`
    color: ${(props) => props.theme.blackWhite};
    cursor: pointer;
    margin-right: 13px;
`

const NoData = styled.div`
    width: 100%;
    height: 500px;
    background-color: #ffffff;
    text-align: center;
`
                               
function AllPost({post, divi/*학과*/, division/*학부*/, category, AllDivision}:any){
    const [selectPost, setPost] = useState<InewBoard[]>();
    const [firstPost, setFirstPost] = useState<InewBoard[]>();
    const [pages, setPages] = useState<Number[]>([]);
    const [clickPage, setClickPage] = useState<Number>(1);
    const navigate = useNavigate();
    const {title} = useParams();

    function categpryPost(getPost:InewBoard[], category:string){
        const selPost = [] as InewBoard[];
        getPost?.map((post:InewBoard) => {
            if(post.category === category){
                selPost.push(post);
            }
        })

        setPost(selPost.reverse());
    }

    useEffect(()=>{
        
        if(post){
            const searchPost = [] as InewBoard[];
            if(title){
                
                post?.map((post:InewBoard) => {
                    
                    if(post.title.includes(title)){
                        searchPost.push(post);
                    }
                })
                setFirstPost(searchPost);
                if(category === "전체"){
                    setPost(searchPost.reverse());
                }else{
                    categpryPost(searchPost, category);
                }
            }else{
                setFirstPost(post);
                if(category === "전체"){
                    setPost(post.reverse());
                }else{
                    categpryPost(post, category);
                }
            }
        }
    },[post,category]);
   

    useEffect(()=>{
        const divisionPost = [] as InewBoard[];
        
        if(post){

            if(division?.divisionname === "전체"){
                if(category === "전체"){
                    setPost(post.reverse());
                }else{
                    categpryPost(post, category);
                }
            }else if(division !== undefined  || divi?.divisionname === "전체"){
                firstPost?.map((post:InewBoard)=> {
                    const dd = post.divisioncode.split(',');
                    if(dd[0] === division.divisionname){
                        divisionPost.push(post);
                    }
                })
                if(category === "전체"){
                    setPost(divisionPost.reverse());
                }else{
                    categpryPost(divisionPost, category);
                }

                
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

    useEffect(()=>{
        const lastPage = Math.ceil(Number(selectPost?.length) / 10);
        const pages = [];
        for(let i = 1; i <= lastPage; i++){
            pages.push(i);
        }
        setPages(pages);
        
    },[selectPost])
    
    

    
    return(
        <Wrraper>
            
            <PostBox>
                <Title>
                    <div>제목</div>
                    <div>작성 날짜</div>
                    <div>조회수</div>
                </Title>
                {selectPost?.length !== 0 ? 
                <div>
                    {selectPost?.map((post, idx)=>(
                        (Number(clickPage) - 1) * 10 <= idx && Number(clickPage) * 10 - 1 >= idx ?
                        <Post onClick={() => navigate(`/post/${post.no}`)} key={idx}>
                            <h1>{post.title}</h1>
                            <div>{post?.createdtime?.split('T')[0]}</div>
                            <div>{post?.counts+""}</div>
                        </Post> : null
                    ))}
                    <PageBox>
                        {pages.map((pages) => (
                                    <Page key={pages+""} onClick={() => setClickPage(pages)}>{pages+""}</Page>
                                ))} 
                    </PageBox>
                </div> : <NoData>데이터 없음</NoData>}
            </PostBox> 
        
        </Wrraper>
    )
}



export default React.memo(AllPost);
import { InewBoard, updateBoard } from "../service/BoardService";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import favorite from "../img/favorite_border_black.png"
import favoriteB from "../img/favorite_fill_black.png"
import { AnimatePresence, motion } from "framer-motion";

const Wrraper = styled.div`
    margin-top: 40px;
    width: 100%;
    min-height: 58vh;
    margin: 0 auto;
    margin-top: 40px;
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
    cursor: pointer;
    margin-right: 13px;
`

const NoData = styled.div`
    width: 100%;
    height: 500px;
    background-color: #ffffff;
    text-align: center;
`

const FavoriteBtn = styled(motion.div)`
    width: 100%;
    height: 30px;
    & > img{
        width: 30%;
        height: 100%;
        cursor: pointer;
    }
`

function SelectPost({post}:any){
    const [selectPost, setPost] = useState<InewBoard[]>();
    const [pages, setPages] = useState<Number[]>([]);
    const [clickPage, setClickPage] = useState<Number>(1);
    const navigate = useNavigate();
    const [faCheck, setFavoriteCheck] = useState(true);

    useEffect(()=>{
        let selPost = [] as InewBoard[];
        if(post){
            post.map((post:InewBoard)=>{
                if(post.addboard === true){
                    selPost.push(post);
                }
            })

            setPost(selPost);
        }
    },[])

    useEffect(()=>{
        const lastPage = Math.ceil(Number(selectPost?.length) / 10);
        const pages = [];
        for(let i = 1; i <= lastPage; i++){
            pages.push(i);
        }
        setPages(pages);
        
    },[selectPost])

    function favoriteClick(){
        setFavoriteCheck((prev) => !prev);

       

        if(faCheck){
            //true 빼기
            const getPost = {
                no: post?.no,
                divisioncode: post?.divisioncode,
                category: post?.category,
                title: post?.title,
                contents: post?.contents,
                addboard: false,
                studentid: post?.studentid,
                createdtime: post?.createdtime,
                counts: post?.counts
            }as InewBoard;

            updateBoard(Number(post.no), getPost);

            
        }else{
            //false 등록
            const getPost = {
                no: post?.no,
                divisioncode: post?.divisioncode,
                category: post?.category,
                title: post?.title,
                contents: post?.contents,
                addboard: true,
                studentid: post?.studentid,
                createdtime: post?.createdtime,
                counts: post?.counts
            }as InewBoard;

            updateBoard(Number(post.no), getPost);
        }
    }

    return(
        <Wrraper>
            <PostBox>
                <div>*게시물은 최대 4개까지 표시 가능합니다</div>
                <Title>
                    <div>제목</div>
                    <div>작성 날짜</div>
                    <div>조회수</div>
                    <div>추천</div>
                </Title>
                {selectPost?.length !== 0 ? 
                <div>
                    {selectPost?.map((post, idx)=>(
                        (Number(clickPage) - 1) * 10 <= idx && Number(clickPage) * 10 - 1 >= idx ?
                        <Post onClick={() => navigate(`/post/${post.no}`)} key={idx}>
                            <h1>{post.title}</h1>
                            <div>{post?.createdtime?.split('T')[0]}</div>
                            <div>{post?.counts+""}</div>
                            <AnimatePresence>
                                <FavoriteBtn whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                                    {faCheck ? 
                                    <motion.img layoutId="favorite" src={favoriteB} onClick={favoriteClick} /> 
                                    : <motion.img layoutId="favorite" src={favorite} onClick={favoriteClick} />}
                                </FavoriteBtn>
                            </AnimatePresence>
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

export default SelectPost;
import { connect } from "react-redux";
import { Idivision, InewBoard } from "../service/BoardService";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import NullWhite from "../img/null_white.png";
import NullBlack from "../img/null_black.png";
import { isTheme } from "../atom";
import { useRecoilValue } from "recoil";
import Pagination from "react-js-pagination";
import { es } from "date-fns/locale";


const Wrraper = styled.div`
    margin-top: 40px;
    width: 60%;
    @media screen and (max-width: 1400px) {
        width: 80%;
    }
    @media screen and (max-width: 850px) {
        width: 90% ;
    }
    @media screen and (max-width: 600px) {
        width: 95%;
    }
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

const NoData = styled.div`
    width: 100%;
    height: 500px;
    background-color: ${(props) => props.theme.bgColor};
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 4px 4px 1px black;
    & > img{
        width: 100px;
        height: 100px;
        margin-bottom: 30px;
    }

    & > div{
        color: ${(props) => props.theme.blackWhite};
    }
`
const PaginationBox = styled.div`
  .pagination { display: flex; justify-content: center; margin-top: 15px;}
  ul { list-style: none; padding: 0; }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; 
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #95C94A; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #95C94A; }
  ul.pagination li a:hover,
  ul.pagination li a.active { color: #95C94A; }
`

function AllPost({post, divi/*학과*/, division/*학부*/, category, AllDivision}:any){
    const [selectPost, setPost] = useState<InewBoard[]>();
    const [firstPost, setFirstPost] = useState<InewBoard[]>();
    const navigate = useNavigate();
    const {title} = useParams();
    const isTh = useRecoilValue(isTheme);
    const [page, setPage] = useState<number>(1);
    const [postSort, setPostSort] = useState<boolean>(false);
   

    const handlePageChange = (page:number) => {
      setPage(page);
    };

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
   
   
    const sortCountClick = () => {
        if(postSort){
            selectPost?.sort((a:InewBoard,b:InewBoard) =>(Number(a.counts )- Number(b.counts)));
            setPostSort((prev) => !prev);
        }else{
            selectPost?.sort((a:InewBoard,b:InewBoard) =>(Number(b.counts )- Number(a.counts)));
            setPostSort((prev) => !prev);
        }
    }
    const sortDateClick = () => {
        if(postSort){
            selectPost?.sort((a:InewBoard,b:InewBoard) =>(new Date(a.createdtime+"").valueOf() - new Date(b.createdtime+"").valueOf()));
            setPostSort((prev) => !prev);
        }else{
            selectPost?.sort((a:InewBoard,b:InewBoard) =>(new Date(b.createdtime+"").valueOf() - new Date(a.createdtime+"").valueOf()));
            setPostSort((prev) => !prev);
        }
        
        
    }
   
    return(
        <Wrraper>
            
            <PostBox>
                <Title>
                    <div>제목</div>
                    <div onClick={sortDateClick}>작성 날짜</div>
                    <div onClick={sortCountClick}>조회수</div>
                </Title>
                {selectPost && selectPost?.length != 0 ? 
                    <div>
                        {selectPost?.slice(10 * (page-1), 10*(page-1) + 10)?.map((post, idx)=>(
                            <Post onClick={() => navigate(`/post/${post.no}`)} key={idx}>
                                <h1>{post.title}</h1>
                                <div>{post?.createdtime?.split('T')[0]}</div>
                                <div>{post?.counts+""}</div>
                            </Post> 
                        ))}
                        
                        <PaginationBox>
                            <Pagination
                                // 현제 보고있는 페이지 
                                activePage={page}
                                // 한페이지에 출력할 아이템수
                                itemsCountPerPage={10}
                                // 총 아이템수
                                totalItemsCount={selectPost?.length-1}
                                // 표시할 페이지수
                                pageRangeDisplayed={5}
                                // 함수
                                onChange={handlePageChange} />
                        </PaginationBox>
                        
                        
                    </div> :
                <NoData>
                    <img src={isTh ?  NullWhite : NullBlack } />
                    <div>작성된 게시물이 없습니다.</div>    
                </NoData>}
            </PostBox> 
        
        </Wrraper>
    )
}



export default React.memo(AllPost);
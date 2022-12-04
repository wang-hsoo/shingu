import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import ApexChart from "react-apexcharts";
import { getBoad, getCategory, Icategory, InewBoard } from "../service/BoardService";
import { connect } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Footer from "./Fotoer";
import NullWhite from "../img/null_white.png";
import NullBlack from "../img/null_black.png";
import { useRecoilValue } from "recoil";
import { isTheme } from "../atom";

const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Chart = styled.div`
    width: 650px;
    margin: 0 auto;
    margin-top: 20px;
`
const CatePost = styled(motion.div)`
`
const PostBox = styled.div`
    width: 100%;
    margin-top: 20px;
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

interface IcateBoard{
    cate1: InewBoard[],
    cate2: InewBoard[],
    cate3: InewBoard[],
    cate4: InewBoard[],
    cate5: InewBoard[],
    cate6: InewBoard[]
}


function DateChart({post}:any){
    const [date, setDate] = useState<Date>(new Date());
    const [selectDate, setSelectDate] = useState<string>();
    const [category, setCategory] = useState<Icategory[]>([]);
    const [selectPost, setSelectPost] = useState<InewBoard[]>(); // 해당 날짜 게시물
    const [catePost, setCatePost] = useState<IcateBoard>(); // 카테고리 별로 정리
    const [pages, setPages] = useState<Number[]>([]);
    const [clickPage, setClickPage] = useState<Number>(1);
    const navigate = useNavigate();
    const isTh = useRecoilValue(isTheme);


    function cateSort(post:InewBoard[]){
        const cateSele:IcateBoard = {
            cate1: [],
            cate2: [],
            cate3: [],
            cate4: [],
            cate5: [],
            cate6: []
        }

        post.map((post) => {

            const category = post.category;
            switch(category){
                case "건물":
                    cateSele.cate1.push(post);
                    break;
                    
                case "기숙사":
                    cateSele.cate2.push(post);
                    break;
    
                case "휴학/복학":
                    cateSele.cate3.push(post);
                    break;
    
                case "편의시설":
                    cateSele.cate4.push(post);
                    break;
                
                case "주차장":
                    cateSele.cate5.push(post);
                    break;
    
                case "기타":
                    cateSele.cate6.push(post);
                    break;
    
             }
        })


        setCatePost(cateSele);
         
    }
    function dateSort(DATE:string){
        const todayPost = [] as InewBoard[];
        post?.map((post:InewBoard) => {
            const postDate = post.createdtime?.split('T') as string[];
            if(postDate[0] === DATE){
                todayPost.push(post);
            }
        })

       

        cateSort(todayPost);
        setSelectPost(todayPost);
    }
 
    useEffect(()=>{
        const today = new Date().toLocaleDateString().replace(" ","").replace(" ","").split('.');
        const month = Number(today[1]) < 10 ? 0 + `${today[1]}` : today[1];
        const day = Number(today[2]) < 10 ? 0 + `${today[2]}` : today[2];
        const DATE = `${today[0]}-${month}-${day}`;
        dateSort(DATE);
        
        
        getCategory().then((value => {
            setCategory(value);
        }));
        

    },[post]);
  
    useEffect(()=>{
        
        if(selectDate === null || selectDate === undefined){

        }else{
            const selDate = selectDate?.replace(" ","").replace(". ",".").split('.') as string[];
            const month = Number(selDate[1]) < 10 ? 0 + `${selDate[1]}` : selDate[1];
            const day = Number(selDate[2]) < 10 ? 0 + `${selDate[2]}` : selDate[2];
            const DATE = `${selDate[0]}-${month}-${day}`;
            dateSort(DATE);
            
        }
        
    },[selectDate])

    useEffect(()=>{
        const lastPage = Math.ceil(Number(selectPost?.length) / 10);
        const pages = [];
        for(let i = 1; i <= lastPage; i++){
            pages.push(i);
        }
        setPages(pages);
        
    },[selectPost])

   
    
   
    
    return(
        <Wrapper>
            <Chart>
                <ApexChart 
                            type="donut" 
                            series={catePost ? [ catePost.cate1.length,catePost.cate2.length, catePost.cate3.length,  catePost.cate4.length, catePost.cate5.length, catePost.cate6.length] : []}
                            options={{
                                theme:{
                                    mode:"light"
                                },
                                chart : {
                                    height: 100,
                                    width: 100,
                                    toolbar: {
                                        show: false
                                    },
                                    background: "transparent",
                                },
                                
                                stroke: {
                                    curve: "smooth",
                                    width: 3
                                },
                                plotOptions:{
                                    pie:{
                                        donut:{
                                            labels:{
                                                show:true,
                                                total:{
                                                    showAlways: true,
                                                    show:true,
                                                    label: "총 게시물 수",
                                                    fontSize:"24px",
                                                    color: "black"
                                                },
                                                value:{
                                                    color: "black",
                                                }
                                            }
                                        }
                                    }
                                },
                                
                            
                                labels:[`${category[1]?.category}`,`${category[2]?.category}`,`${category[3]?.category}`,`${category[4]?.category}`,`${category[5]?.category}`,`${category[6]?.category}`],
                                
                                colors:["#006ad5", "#2a92d5" ,"#fae5c7","#abd558","#5b8307","#1d2d0f"],
                            
                            }} 
                        />

                </Chart>

                <DatePicker
                selected={date}
                onChange={(date:Date) => {
                    const Date = date.toLocaleDateString();
                    setDate(date);
                    setSelectDate(Date);
                }}
                dateFormat="yyyy-MM-dd (eee)"
                locale={ko}
               maxDate={new Date()}
            />

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
                    </div> : 
                    <NoData>
                        <img src={isTh ? NullWhite : NullBlack} />
                        <div>작성된 게시물이 없습니다.</div>    
                    </NoData>}
                </PostBox> 
            
                
        
           
        </Wrapper>
        
    )
}


export default React.memo(DateChart);
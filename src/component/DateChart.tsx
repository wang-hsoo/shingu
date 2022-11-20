import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import ApexChart from "react-apexcharts";
import { getBoad, getCategory, Icategory, InewBoard } from "../service/BoardService";
import { connect } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const CateDiv = styled.div`
    display: flex;
    div{
        width: 100px;
        margin-right: 10px;
    }
`
const CatePost = styled(motion.div)`
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
            const DATE = `${selDate[0]}-${selDate[1]}-${selDate[2]}`;
            dateSort(DATE);
           
            
        }
        
    },[selectDate])

   
    
   
    
    return(
        <div>
            일별 차트
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
            <div style={{width: "500px"}}>
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

            </div>
            <CateDiv>
                {category.map((category, idx) => (
                    idx !== 0 && idx < 4 ? 
                    <div>
                        {category.category}
                    </div> : null
                ))}
                {catePost?.cate1.map((post)=>(
                    <div>{post.title}</div>
                ))}
            </CateDiv>
            <CateDiv>
                {category.map((category, idx) => (
                     idx > 3 ? 
                    <div>
                        {category.category}
                    </div> : null
                ))}
            </CateDiv>
            

            
            
            
        </div>
    )
}


export default React.memo(DateChart);
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApexChart from "react-apexcharts";
import { connect } from "react-redux";
import { getCategory, Icategory, InewBoard } from "../service/BoardService";
import { type } from "@testing-library/user-event/dist/type";

interface ISortPost{
    cate1: Number[],
    cate2: Number[],
    cate3: Number[],
    cate4: Number[],
    cate5: Number[],
    cate6: Number[],
}

function MonthChart({post}:any){
    const [startDate, setStartDate] = useState(new Date());
    const [sortPost, setSortPost] = useState<InewBoard[][]>();
    const [category, setCategory] = useState<Icategory[]>([]);
    const [chartSortPost, setChartSortPost] = useState<ISortPost>();


    useEffect(()=>{
        let allPost = [] as InewBoard[];
        
        //년도 분류
        post.map((post:InewBoard)=>{
            const postYear = post.createdtime?.split('-') as string[];
            const selYear = startDate.toString().split(' ') as string[];
            if(postYear[0] === selYear[3]){
                allPost.push(post);
            }
        })

        //월 분류
        const getPost =  monthSort(allPost);
        setSortPost(getPost);
    },[startDate])

    useEffect(()=>{
        const cate1 = [] as Number[];
        const cate2 = [] as Number[];
        const cate3 = [] as Number[];
        const cate4 = [] as Number[];
        const cate5 = [] as Number[];
        const cate6 = [] as Number[];

        

        sortPost?.map((post:InewBoard[])=>{
            let cate1L = 0;
            let cate2L = 0;
            let cate3L = 0;
            let cate4L = 0;
            let cate5L = 0;
            let cate6L = 0;
            

            if(post.length === 0){

            }else{
                post.map((Opost:InewBoard) => {
                    switch(Opost.category){
                        case `건물`:
                            cate1L += 1;
                            break;

                        case `기숙사`:
                            cate2L += 1;
                            break;

                        case `휴학/복학`:
                            cate3L += 1;
                            break;

                        case `편의시설`:
                            cate4L += 1;
                            break;
                            
                        case `주차장`:
                            cate5L += 1;
                            break;

                        case `기타`:
                            cate6L += 1;
                            break;
                    }
                })
                 
            }
                cate1.push(cate1L)
                cate2.push(cate2L)
                cate3.push(cate3L)
                cate4.push(cate4L)
                cate5.push(cate5L)
                cate6.push(cate6L) 

            
        })

        const ALL = {
            cate1: cate1,
            cate2: cate2,
            cate3: cate3,
            cate4: cate4,
            cate5: cate5,
            cate6: cate6,
        }
        setChartSortPost(ALL);
        
        
    },[sortPost])



    useEffect(()=>{
        getCategory().then((value => {
            setCategory(value);
        }));
    },[])

    return(
        <div>
             <DatePicker
                selected={startDate}
                onChange={(date:Date) => setStartDate(date)}
                showYearPicker
                dateFormat="yyyy"
                maxDate={new Date()}
                />

            <ApexChart
                        type="bar"
                        
                        
                        height= "800"
                        series={[{
                            name: `${category[1]?.category}`,
                            data: chartSortPost?.cate1.map((post) => Number(post)) || []
                          }, {
                            name: `${category[2]?.category}`,
                            data: chartSortPost?.cate2.map((post) => Number(post)) || []
                          }, {
                            name: `${category[3]?.category}`,
                            data: chartSortPost?.cate3.map((post) => Number(post)) || []
                          }, {
                            name: `${category[4]?.category}`,
                            data: chartSortPost?.cate4.map((post) => Number(post)) || []
                          }, {
                            name: `${category[5]?.category}`,
                            data: chartSortPost?.cate5.map((post) => Number(post)) || []
                          },{
                            name: `${category[6]?.category}`,
                            data: chartSortPost?.cate6.map((post) => Number(post)) || []
                          }
                        ]}

                        options={{
                            
                            theme:{
                                mode:"light"
                            },
                            chart : {
                                height: 100,
                                width: 100,
                                stacked:true,
                                toolbar: {
                                    show: false
                                },
                                background: "transparent",
                            },
                            
                            stroke: {
                                width: 1
                            },
                            plotOptions:{
                                bar:{
                                    horizontal: true,
                                    dataLabels: {
                                        total: {
                                        enabled: true,
                                        offsetX: 0,
                                        style: {
                                            fontSize: '13px',
                                            fontWeight: 900
                                        }
                                        }
                                    },
                                        
                                    
                                }
                            },
                            xaxis:{
                                categories: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
                            },
                            legend: {
                                position: 'top',
                                horizontalAlign: 'left',
                                offsetX: 40
                              },
                            
                            
                        
                            labels:[],
                            
                            colors: ["#0fbcf9", "#a3a3a3" ,"#ea2020","black","#ea2020","#ea2020"],
                        
                        }} 
                    />

        </div>
    )
}

function mapStateToProps(state:InewBoard[]){
    const post = state[0];
    return {post: post}
}



function monthSort(post:InewBoard[]){
    let sortPost = [[],[],[],[],[],[],[],[],[],[],[],[]] as InewBoard[][];

   
    post.map((post:InewBoard)=>{
        const postYear = post.createdtime?.split('-') as string[];
        sortPost[Number(postYear[1])-1].push(post);
    })
    
    return sortPost;
}

export default connect(mapStateToProps) (React.memo(MonthChart));
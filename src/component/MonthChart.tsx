import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApexChart from "react-apexcharts";
import { connect } from "react-redux";
import { getCategory, Icategory, InewBoard } from "../service/BoardService";
import { type } from "@testing-library/user-event/dist/type";

function MonthChart({post}:any){
    const [startDate, setStartDate] = useState(new Date());
    const [sortPost, setSortPost] = useState();
    const [category, setCategory] = useState<Icategory[]>([]);


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
                            data: [44, 55, 41, 37, 22, 43, 21]
                          }, {
                            name: `${category[2]?.category}`,
                            data: [53, 32, 33, 52, 13, 43, 32]
                          }, {
                            name: `${category[3]?.category}`,
                            data: [12, 17, 11, 9, 15, 11, 20]
                          }, {
                            name: `${category[4]?.category}`,
                            data: [9, 7, 5, 8, 6, 9, 4]
                          }, {
                            name: `${category[5]?.category}`,
                            data: [25, 12, 19, 32, 25, 24, 10]
                          },{
                            name: `${category[6]?.category}`,
                            data: [25, 12, 19, 32, 25, 24, 10]
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
                                categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
    let sortPost = [[],[],[],[],[],[],[],[],[],[],[],[]] as any;

   
    post.map((post:InewBoard)=>{
        const postYear = post.createdtime?.split('-') as string[];
        sortPost[Number(postYear[1])-1].push(post);
    })
    
    return sortPost;
}

export default connect(mapStateToProps) (React.memo(MonthChart));
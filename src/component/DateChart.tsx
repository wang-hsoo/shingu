import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import ApexChart from "react-apexcharts";
import { getBoad, getCategory, Icategory, InewBoard } from "../service/BoardService";

interface IcateBoard{
    cate1: InewBoard[],
    cate2: InewBoard[],
    cate3: InewBoard[],
    cate4: InewBoard[],
    cate5: InewBoard[],
    cate6: InewBoard[]
}


function DateChart({division}:any){
    const [date, setDate] = useState<Date>(new Date());
    const [selectDate, setSelectDate] = useState<string>();
    const [category, setCategory] = useState<Icategory[]>([]);
    const [post, setPost] = useState<InewBoard[]>(); //전체 게시물
    const [selectPost, setSelectPost] = useState<InewBoard[]>(); // 해당 날짜 게시물
    const [catePost, setCatePost] = useState<IcateBoard>(); // 카테고리 별로 정리

    function cateSort(post:InewBoard, category:string){
        const cateSele:IcateBoard = {
            cate1: [],
            cate2: [],
            cate3: [],
            cate4: [],
            cate5: [],
            cate6: []
        }
        console.log(cateSele);

        switch(category){
            case "건물":
                cateSele.cate1.push(post);
                console.log(cateSele);
                break;
                
            case "기숙사":
                cateSele.cate1.push(post);
                console.log(cateSele);
                break;

            case "휴학/복학":
                cateSele.cate1.push(post);
                console.log(cateSele);
                break;

            case "편의시설":
                cateSele.cate1.push(post);
                console.log(cateSele);
                break;
            
            case "주차장":
                cateSele.cate1.push(post);
                console.log(cateSele);
                break;

            case "기타":
                cateSele.cate1.push(post);
                console.log(cateSele);
                break;

         }
         
    }
 
    useEffect(()=>{

 

        getBoad().then(value => {
            const post = [];
            const selPost = [];
            const cate = [] as any;
            getCategory().then((value => {
                cate.push(value);
                setCategory(cate[0]);
            }));
            
            for(let i = 0; i < value.list.length; i++){
                if(value.list[i].divisioncode === division ){
                    post.push(value.list[i]);
                    const date = new Date().toLocaleDateString().replace(" ","").replace(" ","").split('.');
                    if(value.list[i].createdtime.includes(`${date[0]}-${date[1]}-${date[2]}`)){
                        selPost.push(value.list[i]);
                        for(let a = 1; a < cate?.length; a++){
                            if(cate[a].category === value.list[i].category){
                                 cateSort(value.list[i], cate[a].category);
                            }
                        }
                    }
                }

            }
            setPost(post);
            setSelectPost(selPost);

        });
    },[])
    
   

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
            {/* <ApexChart 
                    type="donut" 
                    // series={result ? [ result?.win , result.tie ,result.lose] : []}
                    options={{
                        theme:{
                            mode:"dark"
                        },
                        chart : {
                            height: 200,
                            width: 200,
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
                                            color: "white"
                                        },
                                        value:{
                                            color: "white",
                                        }
                                    }
                                }
                            }
                        },
                        
                       
                        //labels:[category[1].category,category[2].category,category[3].category,category[4].category,category[5].category,category[6].category],
                        
                        colors: ["#0fbcf9", "#a3a3a3" ,"#ea2020"],
                       
                    }} 
                /> */}

            {selectPost?.map((value:InewBoard) => (
                <div key={value.no}>
                    <div>{value.title}</div>
                </div>
            ))}
            
        </div>
    )
}

export default DateChart;
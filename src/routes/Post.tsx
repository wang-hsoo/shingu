import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCategory, getDivision, Icategory, Idivision, InewBoard, selectGetBoad } from "../service/BoardService";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import { createAnswer, getAnswer, Ianswer } from "../service/AnswerService";


const Container = styled.div<{display:boolean}>`
    /* top: -100px; //header 길이만큼 - */
    width: 100%;
    height: 200vh;
    background-color: rgba(0,0,0,0.8);
    position: relative;
    z-index: 1;
    display: ${(props) => props.display ? 'block' : 'none'};
`
const MainCon = styled.div`
    position: absolute;
    z-index: 0;
`

const Context = styled.div`
    white-space: pre-wrap;
`



function Post({post, rootAdd}:any){
    const [selectPost, setSelectPost] = useState<InewBoard>();
    const [today, setToday] = useState<string>();
    const [loginCheck, setLoginCheck] = useState<string>("");
    const {no} = useParams();
    const [context, setContext] = useState<string>("");
    const [selectAnswer, setSelectAnswer] = useState<Ianswer[]>();
    const [admin, setAdmin] = useState<string>();

    useEffect(()=>{
        let answerAll = [] as Ianswer[];
        getAnswer().then(value => {
            value?.map((answer:Ianswer)=>{
                if(answer.no === Number(no)){
                    answerAll.push(answer)
                }
            })
            setSelectAnswer(answerAll);
            
        })
    },[])
    

    useEffect(()=>{
        if(post.length !== 0){
            if(no){
                post?.map((post:InewBoard)=>{
                   if(post.no === Number(no)){
                    setSelectPost(post);
                    const today = post.createdtime?.split("T");
                    setToday(today ? today[0] : "null");
                   }
                })
            }else{
                setSelectPost(post[post.length - 1])
    
                let today = new Date();   
    
                let year = today.getFullYear(); // 년도
                let month = today.getMonth() + 1;  // 월
                let date = today.getDate();  // 날짜
    
                setToday(`${year}-${month}-${date}`);
            }
        }else{
            selectGetBoad(Number(no)).then(value => {
                setSelectPost(value);
            })
        }
    },[])

    useEffect(()=>{
        const user = sessionStorage.getItem("user");
        const admin = sessionStorage.getItem("admin");
        
       

        if(user || admin){
            
            if(user){
                const u = JSON.parse(user);
                
                if(u.id === selectPost?.studentid+""){
                    setLoginCheck(u.id);
                }
            }else if(admin){
                
                getDivision().then((value:Idivision[] )=> {
                    value.map((division:Idivision) => {
                        if(division.divisioncode === Number(admin)){
                            if(division.divisionname === selectPost?.divisioncode.split(",")[1]){
                                setLoginCheck(division.divisionname);
                            }
                            
                        }
                    })
                    
                })
            }
        }

    },[selectPost]);


    

    function onChange(event:React.FormEvent<HTMLElement>){
        //학번 제목 내용을 useState에 저장
        const { value } = event.currentTarget as HTMLInputElement;
        
        setContext(value.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
            
    }

    function onSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();


        const answer = {
            no: Number(selectPost?.no),
            studentid: loginCheck,
            answercontents: context
        } as Ianswer;

        createAnswer(answer);
        setContext("");

        window.location.reload();
        
    }

        
    return(
        <>
            {selectPost ? 
                <div>
                    <Header />
                    <div>{selectPost.category}</div>
                    <div>{selectPost.title}</div>
                    <div>작성자 {selectPost.divisioncode}</div>
                    <div>등록일 {today}</div>
                    <div>조회수 {selectPost.counts+""}</div>
                    <Context>{selectPost?.contents.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')}</Context>

                   
                    <div>
                        {selectAnswer ? selectAnswer?.map((answer:Ianswer) => (
                            <div key={answer.noanswerboard}>
                                <div>{answer.studentid}</div>
                                <div>{answer.answercontents}</div>
                            </div>
                        )):  <div> 답변을 기다리는 중 </div>}
                    </div> 
                  

                    {loginCheck !== "" ? 
                    <form onSubmit={onSubmit}>
                        <textarea placeholder="답변" onChange={onChange} value={context} />
                        <button>답변하기</button>
                    </form> : null}

                </div> : <div>데이터 없음</div>}
        </>
    )
}

function mapStateToProps(state:InewBoard){
    return {post: state}
}

function mapDispatchToProps(dispatch:any){
    return{
        
    }
}



export default connect(mapStateToProps, mapDispatchToProps) (Post);
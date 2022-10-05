import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { rootAdd } from "../store";
import { getDivision, Idivision, InewBoard, selectGetBoad } from "../service/BoardService";
import { useParams } from "react-router-dom";


function Post({post, rootAdd}:any){
    const [getPost, setPost] = useState<InewBoard>();
    const [division, setDivision] = useState<Idivision[]>();
    const [getdivi, setDivi] = useState<Idivision>();
    const [date, setDate] = useState<string>();
    const [admin, setAdmin] = useState<boolean>(false);
    const [context, setContext] = useState<String>("");
    const [answer, setAnswer] = useState<boolean>(false);
    const { no } = useParams();

    function onChange(event:React.FormEvent<HTMLElement>){
        const { value } = event.currentTarget as HTMLInputElement;
        setContext(value);
    }

    function onClick(e:React.FormEvent){
        e.preventDefault();
        if(answer){
            setAnswer(false);
            setContext(getPost?.answercontents+"");
        }else{
            rootAdd({
                no: no,
                answer: 1,
                answercontents: context.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            });
            window.location.reload();
        }
    }
    
    useEffect(() => {
        
            if(no === undefined){
                if(post[0]){
                    setPost(post[0]);
                    var today = new Date();

                    var year = today.getFullYear();
                    var month = ('0' + (today.getMonth() + 1)).slice(-2);
                    var day = ('0' + today.getDate()).slice(-2);
                    var dateString = year + '-' + month  + '-' + day;
                    setDate(dateString);
                }else{
                    console.log("잘못된 경로입니다.");
                }   
                
            }else{
                selectGetBoad(Number(no)).then(value => {
                    const post = [];
                    post.push(value);
                    setPost(post[0]);
                   
                });
            }    
    },[]);

    useEffect(() => {
        const admin = Number(localStorage.getItem("admin"));
        getDivision().then((value => {
            const cate = [];
            cate.push(value);
            setDivision(cate[0]);
            value.reduce(
                (previousValue:any, currentValue:any) => {
                    if(getPost?.divisioncode === currentValue.divisionname){
                        setDivi(currentValue);
                        if(admin === currentValue.divisioncode){
                            setAdmin(true);
                        }
                    }

                }
            )
            
            
        }));
        const date = getPost?.createdtime?.split("T");
        setDate(date ? date[0] : "null" );

        if(getPost?.answer){
            setAnswer(true);
        }
        
    }, [getPost])
    
    return(
        <>
            {getPost && getdivi ?
            <div>
                
                <div>{division?.map((divi) => ( divi.divisioncode === getdivi?.upctg ? divi.divisionname : null))}</div>
                <div>{getdivi?.divisionname}</div>
                {admin ? <div>{getPost?.studentid}</div> : null}
                <h1>{getPost?.title}</h1>
                <div>{getPost?.contents}</div>
                <div>{date}</div>
                <div>{no === undefined ? 0 : getPost?.counts}</div>
                {admin? answer ?   <div>{getPost?.answercontents?.replaceAll("<br>", "\r\n")}</div> : <textarea placeholder="내용" name="내용" value={context+""} onChange={onChange} /> :
                <div>{getPost?.answercontents === null || no === undefined ? "답변을 기다리는 중입니다" : getPost?.answercontents}</div>}
                
                <button>목록으로</button>
                {admin? <button onClick={onClick}>{answer ? "수정하기" : "답변하기"}</button> : null}
            </div> : 
            <div>
                "정보를 불러오지 못함"
            </div>}
        </>
    )
}

function mapStateToProps(state:InewBoard){
    return {post: state}
}

function mapDispatchToProps(dispatch:any){
    return{
        rootAdd: (context:InewBoard) => dispatch(rootAdd(context))
    }
}



export default connect(mapStateToProps, mapDispatchToProps) (Post);
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { rootAdd } from "../store";
import { getDivision, Idivision, InewBoard, selectGetBoad } from "../service/BoardService";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import Login from "../component/Login";
import Search from "../component/Search";
import { useRecoilValue } from "recoil";
import { isPopUp, isSearch } from "../atom";

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

const Answer =styled.div`
    white-space: pre-wrap;
`


function Post({post, rootAdd}:any){
    const [getPost, setPost] = useState<InewBoard>();
    const [division, setDivision] = useState<Idivision[]>();
    const [getdivi, setDivi] = useState<Idivision>();
    const [date, setDate] = useState<string>();
    const [admin, setAdmin] = useState<boolean>(false);
    const [context, setContext] = useState<String>("");
    const [answer, setAnswer] = useState<boolean>(false);
    const { no } = useParams();
    const navigate = useNavigate();
    const Pop = useRecoilValue(isPopUp);
    const search = useRecoilValue(isSearch);

    function onChange(event:React.FormEvent<HTMLElement>){
        const { value } = event.currentTarget as HTMLInputElement;
        setContext(value);
    }

    function onClick(e:React.FormEvent){
        e.preventDefault();
        if(answer){
            setAnswer(false);
            const a = getPost?.answercontents?.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')
            setContext(a+"");
        }else{
            rootAdd({
                no: no,
                answer: 1,
                answercontents: context.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                counts: getPost?.counts
            });
            window.location.reload();
        }
    }
    
    useEffect(() => {
            console.log(post);
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
                    navigate("/");
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
        if(no){
            const date = getPost?.createdtime?.split("T");
            setDate(date ? date[0] : "null" );
        }

        if(getPost?.answer){
            setAnswer(true);
        }
        
    }, [getPost])
    
    return(
        <>
            {getPost && getdivi ?
            <MainCon>
                <Header />
                <div>{division?.map((divi) => ( divi.divisioncode === getdivi?.upctg ? divi.divisionname : null))}</div>
                <div>{getdivi?.divisionname}</div>
                {admin ? <div>{getPost?.studentid}</div> : null}
                <h1>{getPost?.title}</h1>
                <div>{getPost?.contents}</div>
                <div>{date}</div>
                <div>{no === undefined ? 0 : getPost?.counts}</div>
                {admin? answer ?   <Answer>{getPost?.answercontents?.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')}</Answer> : <textarea placeholder="내용" name="내용" value={context+""} onChange={onChange} /> :
                <div>{getPost?.answercontents === null || no === undefined ? "답변을 기다리는 중입니다" : getPost?.answercontents}</div>}
                
                <button onClick={() => navigate('/')}>목록으로</button>
                {admin? <button onClick={onClick}>{answer ? "수정하기" : "답변하기"}</button> : null}
            </MainCon> : 
            <MainCon>
                "정보를 불러오지 못함"
            </MainCon>}
            <Container display={Pop || search}>
                    {Pop ? <Login /> : null}
                    {search ? <Search />: null}
            </Container>
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
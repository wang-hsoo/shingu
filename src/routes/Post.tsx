import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCategory, getDivision, Icategory, Idivision, InewBoard, selectGetBoad } from "../service/BoardService";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import { createAnswer, getAnswer, Ianswer } from "../service/AnswerService";
import { useRecoilValue } from "recoil";
import { isPopUp, isSearch } from "../atom";
import Login from "../component/Login";
import Search from "../component/Search";
import BannerImg from "../img/board_banner.png";
import Footer from "../component/Fotoer";


const Container = styled.div<{display:boolean}>`
    width: 100%;
    height: 200vh;
    background-color: rgba(0,0,0,0.8);
    position: relative;
    z-index: 1;
    display: ${(props) => props.display ? 'block' : 'none'};
`
const Wrrpaer = styled.div`
    width: 100vw;
    
`

const MainCon = styled.div`
    width: 100%;
    position: absolute;
    z-index: 0;
`

const Con = styled.div`
    margin-top: 80px;
    min-height: 69vh;
`
const Banner = styled.div<{bg:string}>`
    width: 100%;
    height: 205px;
    background-image: url(${(props)=> props.bg});
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    & > div{
        color: white;
        margin-top: 40px;
        font-size: 35px;
        font-weight: 700;
        transform: rotate(-13deg);
    }
`

const QnaCon = styled.div`
    width: 60%;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TItle = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border-bottom: 2px solid rgba(0, 0, 0, 1);
    margin-bottom: 15px;
    & > div{
        margin-bottom: 5px;
        font-size: 32px;
    }
`

const Info = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    & > div{
        color: #7D7D7D;
        font-size: 18px;
        margin-right: 10px;
    }
`

const PostBox = styled.div`
    width: 100%;
    margin-top: 20px;
`
const Context = styled.div<{answer:boolean}>`
    white-space: pre-wrap;
    position: relative;
	background: ${(props) => props.answer ? "#EEEEEE" : "#95C94A" };
	border-radius: .4em;
    width: 500px;
    text-align: center;
    padding: 30px 50px;
    color: ${(props) => props.answer ? "#333333" : "#ffffff" };
    
    
    &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: 34px solid transparent;
        border-top-color: ${(props) => props.answer ? "#EEEEEE" : "#95C94A" };
        border-bottom: 0;
        border-left: ${(props) => props.answer ? "0" : "-10px" };
        border-right: ${(props) => props.answer ? "-10px" : "0" };;
        margin-left: ${(props) => props.answer ? "-180px" : "180px" };
        margin-bottom: -28px;
    }
`

const AnwerCon = styled.div<{answer:boolean}>`
    width: 100%;
    display: flex;
    margin-top: 50px;
    justify-content: ${(props) => props.answer ? "flex-start" : "flex-end" };;

`

const Form = styled.form`
    width: 100%;
    margin-top: 100px;
    flex-direction: column;
    display: flex;
`

const Text = styled.textarea`
    margin-top: 50px;
    width: 100%;
	height: 96px;
	padding: 10px;
	box-sizing: border-box;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	resize: none;
    box-shadow: 2px 4px 4px 1px rgba(0,0,0,0.4); 

    &:focus {
        outline: solid 2px #95C94A;
    }
`
const Btn = styled.button`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    & > button{
            font-size: 14px;
            padding: 8px 20px;
            background-color: #F36700;
            color: #ffffff;
            border-radius: 15px;
            margin-right: 10px;
    }
    
    & > button:nth-child(1){
        background: #95C94A;
    }

`



function Post({post, rootAdd}:any){
    const [selectPost, setSelectPost] = useState<InewBoard>();
    const [today, setToday] = useState<string>();
    const [loginCheck, setLoginCheck] = useState<string>("");
    const {no} = useParams();
    const [context, setContext] = useState<string>("");
    const [selectAnswer, setSelectAnswer] = useState<Ianswer[]>();
    const [admin, setAdmin] = useState<string>();
    const Pop = useRecoilValue(isPopUp);
    const search = useRecoilValue(isSearch);
    const navigate = useNavigate();

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
        
        setContext(value);
            
    }

    function onSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();


        const answer = {
            no: Number(selectPost?.no),
            studentid: loginCheck,
            answercontents: context.replace(/(?:\r\n|\r|\n)/g, '<br/>')
        } as Ianswer;

        createAnswer(answer);
        setContext("");

        window.location.reload();
        
    }

        
    return(
        <>
            {selectPost ? 
                <Wrrpaer>
                    
                    <MainCon>
                        <Header />
                        <Con>
                            <Banner  bg={BannerImg}>
                                <div>{selectPost.category}</div>
                            </Banner>
                            <QnaCon>
                                <TItle>
                                    <div>{selectPost.title}</div>
                                </TItle>
                                <Info>
                                    <div>작성자 {selectPost.divisioncode.split(',')[1]} |</div>
                                    <div>등록일 {today} |</div>
                                    <div>조회수 {selectPost.counts+""}</div>
                                </Info>
                            
                                <PostBox>
                                    <Context answer={true}>{selectPost?.contents.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')}</Context>
                                    {selectAnswer ? selectAnswer?.map((answer:Ianswer) => (
                                        <AnwerCon key={answer.noanswerboard} answer={isNaN(Number(answer.studentid)) ? false : true}>
                                            <Context answer={isNaN(Number(answer.studentid)) ? false : true}>{answer.answercontents}</Context>
                                            <div>{ isNaN(Number(answer.studentid))}</div>
                                        </AnwerCon>
                                    )):  <div> 답변을 기다리는 중 </div>}
                                </PostBox> 
                            

                                {loginCheck !== "" ? 
                                <Form onSubmit={onSubmit}>
                                    <Text placeholder="질문하고 싶은것을 입력하세요." onChange={onChange} value={context} />
                                    <Btn>
                                        <button onClick={()=> {
                                                navigate('/');
                                                window.location.reload();
                                            }}>목록으로</button>
                                        <button>작성하기</button>
                                    </Btn>
                                </Form> : 
                                <Btn>
                                    <button onClick={()=> {
                                                navigate('/');
                                                window.location.reload();
                                            }}>목록으로</button>
                                </Btn>}
                                
                                
                            </QnaCon>
                        </Con>
                        <Footer />
                </MainCon>
                
                <Container display={Pop || search}>
                    {Pop ? <Login /> : null}
                    {search ? <Search />: null}
                </Container>

                </Wrrpaer> : <div>데이터 없음</div>}
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
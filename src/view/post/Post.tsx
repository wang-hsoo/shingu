import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { selectGetBoad } from "../../service/BoardService";
import { Ianswer, InewBoard } from "../../service/Interface";
import { isTheme } from "../../store/atom";
import { useRecoilValue } from "recoil";
import { getAnswer } from "../../service/AnswerService";
import Navigation from "../../component/navigation/Navigation";





function Post(){
    const [post, setPost] = useState<InewBoard>();
    const [selectAnswer, setSelectAnswer] = useState<Ianswer[]>();

    const {no} = useParams();
    const navigate = useNavigate();
    const isTh = useRecoilValue(isTheme);

    const [faCheck, setFavoriteCheck] = useState(false);
    const [today, setToday] = useState<string>();
    const [loginCheck, setLoginCheck] = useState<string>("");

    useEffect(()=>{
        if(no){
            selectGetBoad(Number(no)).then(value => {
                setPost(value);
                const today = value.createdtime?.split("T");
                setFavoriteCheck(value.addboard);
                setToday(today ? today[0] : "null");
            })
            
        }
    },[])

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
        const user = sessionStorage.getItem("userInfo");
        const admin = sessionStorage.getItem("adminInfo");
        
       

        if(user || admin){
            
            if(user){
                const u = JSON.parse(user);
                
     
                if(u.studentid === post?.studentid+""){
                    setLoginCheck(u.studentid);
                }
            }else if(admin){
                
                
            }
        }
    },[post]);

    return(
        <>
         {post ?
            <div>
                <div>
                    {/* <Navigation check={false}/> */}
                </div>

                <div>
                    <div>
                        <div>{post.category}</div>
                    </div>

                    <div>
                        <div>
                            <div>{post.title}</div>
                        </div>

                        <div>
                            <div>
                                <div>작성자 {loginCheck !== "" ? post.studentid+"" : post.divisioncode+""} |</div>
                                <div>등록일 {today} |</div>
                                <div>조회수 {post.counts+""}</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            : null}
        </>
       
    )
}

export default Post;
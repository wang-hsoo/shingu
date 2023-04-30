import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { selectGetBoad } from "../../service/BoardService";
import { Ianswer, InewBoard } from "../../service/Interface";
import { isTheme } from "../../store/atom";
import { useRecoilValue } from "recoil";
import { getAnswer } from "../../service/AnswerService";
import Navigation from "../../component/navigation/Navigation";
import { Banner, Content, FavoriteBtn, Info, MainCon, PostWrapper, QnaCon, TItle } from "./PostDetailStyle";
import BannerImg from "../../img/board_banner.png";
import favorite from "../../img/favorite_border_black.png"
import favoriteB from "../../img/favorite_fill_black.png"
import favoriteW from "../../img/favorite_border_white.png"
import favoritefillW from "../../img/favorite_fill_white.png"
import { motion, AnimatePresence } from "framer-motion";




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

    function favoriteClick(){
        setFavoriteCheck((prev) => !prev);

       

        if(faCheck){
            //true 빼기
           
            

            
        }else{
            //false 등록
            
        }
    }

    return(
        <>
         {post ?
            <PostWrapper>
                <MainCon>
                    <Navigation check={false}/>
                  

                    <Content>
                        <Banner bg={BannerImg}>
                            <div>{post.category}</div>
                        </Banner>

                        <QnaCon>
                            <TItle>
                                <div>{post.title}</div>
                            </TItle>

                            <Info>
                                <div>
                                    <div>작성자 {loginCheck !== "" ? post.studentid+"" : post.divisioncode+""} |</div>
                                    <div>등록일 {today} |</div>
                                    <div>조회수 {post.counts+""}</div>

                                </div>
                                {isNaN(Number(loginCheck)) ?
                                    <AnimatePresence>
                                        <FavoriteBtn whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                                            {faCheck ?
                                            isTh ? <motion.img layoutId="favorite" src={favoritefillW} onClick={favoriteClick} />  : 
                                            <motion.img layoutId="favorite" src={favoriteB} onClick={favoriteClick} /> 
                                            : isTh ? <motion.img layoutId="favorite" src={favoriteW} onClick={favoriteClick} />  
                                            : <motion.img layoutId="favorite" src={favorite} onClick={favoriteClick} />}
                                        </FavoriteBtn>
                                    </AnimatePresence> : null
                                    
                                    }
                            </Info>
                        </QnaCon>
                    </Content>
                </MainCon>
            </PostWrapper>

            : null}
        </>
       
    )
}

export default Post;
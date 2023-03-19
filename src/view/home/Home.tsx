import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import MainBanner from "../../component/banner/MainBanner";
import Navigation from "../../component/navigation/Navigation";
import PostBoard from "../../component/postBoard/PostBoard";
import { getBoad } from "../../service/BoardService";
import { InewBoard, Iuser } from "../../service/Interface";
import { isPost } from "../../store/atom";
import { Container } from "../../styles/container";
import { AllTitle } from "./style";

function Home(){
    const navigation = useNavigate();
    const { division } = useParams();
    const [ALLPOST, setPost] = useRecoilState(isPost);

    useEffect( () => {
        if( !division ){
            navigation("/");
        } else {
            let user = sessionStorage.getItem("userInfo");
            if(user){
                const getUser = JSON.parse(user) as Iuser;

                if( ALLPOST.length === 0){
                    getBoad(getUser.divisioncode).then( (post:InewBoard[]) =>{
                        setPost([...post]);
                    })
                }
            }
        }
    }, [])

    return(
        <Container>
            <Navigation check={true} />
            <MainBanner />

            <AllTitle>전체 게시물</AllTitle>
            <PostBoard  postA={ ALLPOST } />
        </Container>
    )
}

export default Home;
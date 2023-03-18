import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import MainBanner from "../../component/banner/MainBanner";
import Navigation from "../../component/navigation/Navigation";
import PostBoard from "../../component/postBoard/PostBoard";
import { getBoad } from "../../service/BoardService";
import { InewBoard } from "../../service/Interface";
import { isPost } from "../../store/atom";

function Home(){
    const navigation = useNavigate();
    const { division } = useParams();

    const [ALLPOST, setPost] = useRecoilState(isPost);

    useEffect( () => {
        if( !division ){
            navigation("/");
        } else {
            // if( ALLPOST.length === 0){
            //     getBoad().then( (post:InewBoard[]) =>{
            //         let getPost = [] as InewBoard[];
            //         post.map((postO:InewBoard) => {
            //             if(postO.divisioncode === Number(division)){
            //                 getPost.push(postO);
            //             }
            //         })
            //         setPost([...getPost]);

            //     })
            // }
        }
    }, [])

    return(
        <div>
            <Navigation check={true} />
            <MainBanner />
            <PostBoard  postA={ ALLPOST } />
        </div>
    )
}

export default Home;
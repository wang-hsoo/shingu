import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { InewBoard } from "../../../service/Interface";
import { isPost } from "../../../store/atom";

interface Ititle{
    boardProps:{
        title: String,
        postA: InewBoard[]
    }
    
}

function TopPost(props:Ititle){
    const {boardProps} = props;
    const { title } = boardProps;
    const { postA } = boardProps;


    const [newBoard, setNewBoard] = useState<InewBoard[]>();
    const navigate = useNavigate();
  
    useEffect(()=>{
        if(title == "인기 게시물"){
            const sortArray = postA.sort((a:InewBoard,b:InewBoard) =>(Number(b.counts )- Number(a.counts))).slice(0,4);
        
            if(sortArray.length === 0 || sortArray.length === 4){
                setNewBoard(sortArray);
            }else{
                const post = [...sortArray];
                for(post.length; post.length < 4; ){
                    const a = {
                        no: -1,
                        divisioncode: 0,
                        category: "전체",
                        title: "",
                        contents: "",
                        addboard: false,
                        studentid: 0,
                        createdtime: "",
                        counts: 0,
                        lookup: false
                    }

                    post.push(a);
                    
                    
                }
                setNewBoard(post);
                
            }
            
        }else if ( title == "추천 게시물"){
            let showPost = [] as InewBoard[];

            postA?.map((post:InewBoard)=>{
                    if(post.addboard === true){
                        showPost.push(post);
                    }
            });

            if(postA.length === 0 || postA.length === 4){
                setNewBoard(showPost);
            }else{
                const post = [...showPost];
                for(post.length; post.length < 4; ){
                    const a = {
                        no: -1,
                        divisioncode: 0,
                        category: "",
                        title: "",
                        contents: "",
                        addboard: false,
                        studentid: 0,
                        createdtime: "",
                        counts: 0,
                        lookup: false
                    }

                    post.push(a);
                    
                    
                }
                setNewBoard(post);
            }
        }
    },[postA])


    return(
        <div>
            <h1>{title}</h1>

            {newBoard?.length !== 0 ?  
                newBoard?.map((post:InewBoard) => (
                    <div key={post.no+""}>
                        <div>{post?.title}</div>
                        <div>
                            <div>{post.createdtime?.split('T')[0]}</div>
                            { post?.no !== -1 ? <button onClick={()=> navigate(`/post/${post.no}`)}>More</button> : null}
                        </div>
                    </div>
                )) : null}
        </div>
    )
}


export default TopPost;
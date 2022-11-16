import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../component/Header";
import { InewBoard } from "../service/BoardService";


interface IgetUser{
    name: string,
    id: string,
    division: string
}

function Mypage({post}:any){
    const [getUser, setGetUser] = useState<IgetUser>();


    useEffect(()=>{
        const user = sessionStorage.getItem("user");
         if(user){
            setGetUser(JSON.parse(user));
         }
    },[]);


    return(
        <div>
            <Header />
            <div>
                <div>{getUser?.name}</div>
                <div>{getUser?.id}</div>
                <div>{getUser?.division.split(',')[0]}</div> 
                <div>{getUser?.division.split(',')[1]}</div>
            </div>
            <div>
                {post && post.map((post:InewBoard) => (
                    post.studentid+"" === getUser?.id ?
                        <div>{post.title}</div> : null
                ))}
            </div>
        </div>
    )

}

function mapStateToProps(state:InewBoard[]){
    return {post: state}
}

export default connect(mapStateToProps) (Mypage);
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { IBoardA, InewBoard } from "../../service/Interface"
import { PaginationBox, Post, PostBox, Title, Wrraper } from "./style";





function PostBoard(postProp:IBoardA){
    const { postA } = postProp;
    const navigation = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [boardData, setBoardData] = useState<InewBoard[]>();

    useEffect(() => {
        setBoardData(postA);
    },[postA])

    const handlePageChange = (page:number) => {
        setPage(page);
    };




    return(
        <Wrraper>
            <PostBox>
                <Title>
                    <div>제목</div>
                    <div>작성 날짜</div>
                    <div>조회수</div>
                </Title>
            </PostBox>
            {boardData && boardData.length != 0 ?
                <div>
                    {boardData?.slice(10 * (page-1), 10*(page-1) + 10)?.map((post, idx)=>(
                            <Post onClick={() => navigation(`/post/${post.no}`)} key={idx}>
                                <h1>{post.title}</h1>
                                <div>{post?.createdtime?.split('T')[0]}</div>
                                <div>{post?.counts+""}</div>
                            </Post> 
                    ))}

                    <PaginationBox>
                            <Pagination
                                // 현제 보고있는 페이지 
                                activePage={page}
                                // 한페이지에 출력할 아이템수
                                itemsCountPerPage={10}
                                // 총 아이템수
                                totalItemsCount={boardData?.length-1}
                                // 표시할 페이지수
                                pageRangeDisplayed={5}
                                // 함수
                                onChange={handlePageChange} />
                    </PaginationBox>

                </div> : 
                <div>
                    <div>작성된 게시물이 없습니다.</div>
                </div>           
            }
        </Wrraper>
    )
}

export default PostBoard;
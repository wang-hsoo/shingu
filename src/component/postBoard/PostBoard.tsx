import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { IBoardA, InewBoard } from "../../service/Interface"





function PostBoard(postProp:IBoardA){
    const { postA } = postProp;
    const navigation = useNavigate();
    const [page, setPage] = useState<number>(1);

    const handlePageChange = (page:number) => {
        setPage(page);
      };


    return(
        <div>
            <div>
                <div>제목</div>
                <div>작성 날짜</div>
                <div>조회수</div>
            </div>
            {postA && postA.length != 0 ?
                <div>
                    {postA?.slice(10 * (page-1), 10*(page-1) + 10)?.map((post, idx)=>(
                            <div onClick={() => navigation(`/post/${post.no}`)} key={idx}>
                                <h1>{post.title}</h1>
                                <div>{post?.createdtime?.split('T')[0]}</div>
                                <div>{post?.counts+""}</div>
                            </div> 
                    ))}

                    <div>
                            <Pagination
                                // 현제 보고있는 페이지 
                                activePage={page}
                                // 한페이지에 출력할 아이템수
                                itemsCountPerPage={10}
                                // 총 아이템수
                                totalItemsCount={postA?.length-1}
                                // 표시할 페이지수
                                pageRangeDisplayed={5}
                                // 함수
                                onChange={handlePageChange} />
                    </div>

                </div> : 
                <div>
                    <div>작성된 게시물이 없습니다.</div>
                </div>           
            }
        </div>
    )
}

export default PostBoard;
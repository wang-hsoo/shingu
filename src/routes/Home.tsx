import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { getBoad, getCategory, getDivision, Icategory, Idivision, InewBoard } from "../service/BoardService";
import { useNavigate } from "react-router-dom";
import { countAdd } from "../store";



function Home({countAdd}:any){
    const [post, setPost] = useState<InewBoard[]>();
    const [division, setDivision] = useState<Idivision[]>();
    const [category, setCategory] = useState<Icategory[]>();
    const [selectDivi, setSelectDivi] = useState<Idivision>();
    const [selectDivision, setSelectDivision] = useState<Idivision>();
    const [countPost, setCountPost] = useState<InewBoard[]>();
    const [selectCate, setSelectCate] = useState<string>();
    const[selectPost, setSelectPost] = useState<InewBoard[]>();
    const navigate = useNavigate();

    function postClick(no:number, counts:string){
        countAdd({counts : Number(counts) + 1, no : no})
        navigate(`/post/${no}`)
    }

  

    function divisionChange(event:React.ChangeEvent<HTMLSelectElement>){
        const division = event.target.value.split(",");

            const selectdivi = {
                divisionname: division[0],
                divisioncode: Number(division[1]),
                upctg: Number(division[2])
            }
            setSelectDivision(selectdivi);
            setSelectDivi({
                divisionname: "전체",
                divisioncode: -1,
                upctg: -1
            });
    }
    
    function diviChange(event:React.ChangeEvent<HTMLSelectElement>){
        const division = event.target.value.split(",");

            const selectdivi = {
                divisionname: division[0],
                divisioncode: Number(division[1]),
                upctg: Number(division[2])
            }

            setSelectDivi(selectdivi);
    }

    function selectCategory(event:React.MouseEvent<HTMLButtonElement>){
        setSelectCate(event.currentTarget.value);
    }

    useEffect(() => {
        getBoad().then(value => {
            const getPost = [];
            getPost.push(value);
            setPost(getPost[0].list);
            setSelectPost(getPost[0].list);
        });

        getBoad().then(value => {
            setCountPost(value.list?.sort((a:InewBoard,b:InewBoard) =>(Number(b.counts )- Number(a.counts))).slice(0,4));
        });

        getCategory().then((value => {
            const cate = [];
            cate.push(value);
            setCategory(cate[0]);
            
        }));

        getDivision().then((value => {
            const divi = [];
            divi.push(value);
            setDivision(divi[0]);
        }));

        setSelectCate("전체");
    },[])

    useEffect(() => {
        if(selectDivision?.divisionname === "전체" || selectDivision === undefined){
            const get = [] as InewBoard[];
            if(selectCate === "전체"){
                setSelectPost(post);
                setCountPost(post?.sort((a:InewBoard,b:InewBoard) =>(Number(b.counts )- Number(a.counts))).slice(0,4));
            }else{
                post?.map((post) =>{
                    if(post.category === selectCate){
                        get.push(post);
                    }
                })
                
                setCountPost(get.sort((a:InewBoard,b:InewBoard) =>(Number(b.counts )- Number(a.counts))).slice(0,4));
                setSelectPost(get);
            }

        }else{
            const get = [] as InewBoard[];
            post?.map((post)=>{
                division?.map((division) => {
                    if(post?.divisioncode ===  division?.divisionname){
                        if(selectDivision?.divisioncode === division.upctg){
                            if(selectDivi?.divisionname === "전체" || selectDivi?.divisionname === undefined){
                                //선택된 학부에 전체 게시물
                                if(selectCate === "전체"){
                                    get.push(post);
                                }else if(post.category === selectCate){
                                    get.push(post);
                                }else{
                                    setSelectPost([]);
                                }
                            }else if(selectDivi?.divisionname === post.divisioncode){
                                //선택된 학부에 선택된 학과
                                if(selectCate === "전체"){
                                    get.push(post);
                                }else if(post.category === selectCate){
                                    get.push(post);
                                }else{
                                    setSelectPost([]);
                                }
                            }else{
                                setSelectPost([]);
                            }
                        }
                    }
                })
            })
            setCountPost(get.sort((a:InewBoard,b:InewBoard) =>(Number(b.counts )- Number(a.counts))).slice(0,4));
            setSelectPost(get);
        }

    },[selectDivision,selectDivi,selectCate])

    useEffect(() => {
        setSelectCate("전체");
    },[selectDivision,selectDivi])

    return(
        <div>
            <div>
                <select onChange={divisionChange}>
                    <option value="전체">전체학부</option>
                    {division?.map((divi:Idivision) => ( 
                        divi.upctg !== 0 ? null : 
                        <option key={divi.divisioncode} value={[divi.divisionname, divi.divisioncode+"",  divi.upctg+""]}>{divi.divisionname}</option> 
                    ))}
                </select>

                <select onChange={diviChange}>
                    <option value="전체">전체학과</option>
                    {division?.map((divi:Idivision) => (
                        divi.upctg !== selectDivision?.divisioncode ? null :
                        <option key={divi.divisioncode} value={ [divi.divisionname, divi.divisioncode+"",  divi.upctg+""]}>{divi.divisionname}</option>
                    ))}
                </select>
            </div>
            <div>
                {category?.map((category) => (
                    <button key={category.category} value={category.category} onClick={selectCategory} >{category.category}</button>
                ))}
            </div>
            <div>
                <h1>인기 게시물</h1>
                {countPost?.map((post) => (
                    <div key={post.no} onClick={() => { postClick(Number(post.no), String(post.counts))}}>
                        <div>{post.title}</div>  
                        <div>{post.counts}</div>  
                    </div> 
                   
                ))}
            </div>
            <div>
                <h1>전체 게시물</h1>
                {selectPost?.length !== 0 ? selectPost?.map((post) => (
                     <div key={post.no} onClick={() => {
                        countAdd({counts : Number(post?.counts) + 1, no : post.no})
                        navigate(`/post/${post.no}`)
                    }}>
                        <h1>{post.no}</h1>
                        <div>{post.title}</div>  
                        <div>{post.counts}</div>  
                        <div>{post.createdtime?.split("T")[0]}</div>    
                        <div>{post.answer ? "답변완료" : "답변대기"}</div>  
                    </div> 
                   
                )) : "게시물이 없습니다"}
            </div>
        </div>
        
    )
}

function mapDispatchToProps(dispatch:any){
    return{
        countAdd: (context:object) => dispatch(countAdd(context))
    }
}

export default connect(null, mapDispatchToProps) (Home);
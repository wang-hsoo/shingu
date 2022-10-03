import styled from "styled-components";
import {connect} from "react-redux";
import { add } from "../store";
import React, { Dispatch, useEffect, useState } from "react";
import { getCategory, Icategory, InewBoard } from "../service/BoardService";




function Write({add}:any){
    const [context, setContext] = useState<String>();
    const [title, setTitle] = useState<String>();
    const [hak, setHak] = useState<String>("");
    const [category, setCategory] = useState<Icategory[]>();
    const [selectCate, setSelectCate] = useState<string>();

    function onChange(event:React.FormEvent<HTMLElement>){
        //학번 제목 내용을 useState에 저장
        const { value } = event.currentTarget as HTMLInputElement;
        const { name } = event.target as HTMLInputElement;
        

        switch ( name ){
            case "학번":
                setHak(value);
                break;

            case "제목":
                setTitle(value);
                break;

            case "내용":
                setContext(value.replace("<br>","\r\n"));
                break;
        }
    }

    function cateChange(event:React.ChangeEvent<HTMLSelectElement>){
        //카테고리 저장
        setSelectCate(event.target.value);
    }
    
    function onSubmit(e:React.FormEvent){
        //store.js로 데이터를 보냄
        e.preventDefault();
        if(hak?.length < 10 || context?.length === 0 || title?.length === 0 || context === "" || title === ""){
            console.log("오류")
        }else{
            add({studentid: hak, title: title, contents:context, category: selectCate, divisioncode: "2" })
        }
        
    }

    useEffect(() => {
        setTimeout(() => {
            getCategory().then((value => {
                const cate = [];
                console.log(value);
                // setCategory(cate[0]);
            }));
        }, 100);

        
    },[]);
    return(
        <div>
            <form onSubmit={onSubmit}>
                <select onChange={cateChange} value={selectCate}>
                    {category?.map((cate:Icategory, idx:number) => (
                        // idx === 0 ? null :
                        <option key={cate.category} value={cate.category}>{cate.category}</option>
                    ))}
                </select>
        
                <input type="number" placeholder="학번" name="학번" onChange={onChange} />
                <input type="text" placeholder="제목" name="제목" onChange={onChange} />
                <textarea placeholder="내용" name="내용" onChange={onChange} />
                <button>작성하기</button>
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch:any){
    return{
        add: (context:InewBoard) => dispatch(add(context))
    }
}

export default connect(null, mapDispatchToProps) (Write);

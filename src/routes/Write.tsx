import styled from "styled-components";
import {connect} from "react-redux";
import { add } from "../store";
import React, { Dispatch, useState } from "react";


interface IPostWrite{
    text: string,
    department: string
}


function Write({add}:any){
    const [context, setContext] = useState<String>();
    const [title, setTitle] = useState<String>();
    const [hak, setHak] = useState<String>();

    function onChange(event:React.FormEvent<HTMLElement>){
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
    
    function onSubmit(e:React.FormEvent){
        e.preventDefault();
        add({text: context, department: "IT소프트웨어"})
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="학번" name="학번" onChange={onChange} />
                <input type="text" placeholder="제목" name="제목" onChange={onChange} />
                <textarea placeholder="내용" name="내용" onChange={onChange} />
                <button>작성하기</button>
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch:any){
    return{
        add: (context:IPostWrite) => dispatch(add(context))
    }
}

export default connect(null, mapDispatchToProps) (Write);

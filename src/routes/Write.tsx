import styled from "styled-components";
import {connect} from "react-redux";
import { add } from "../store";
import React, { useState } from "react";




function Write({add}:any){
    const [context, setContext] = useState<String>();

    function onChange(e:any){
        setContext(e.target.value);
    }
    
    function onSubmit(e:any){
        e.preventDefault();
        add({text: context, department: "IT소프트웨어"})
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} />
                <input type="text"  />
                <input type="text"  />
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch:any){
    return{
        add: (context:any) => dispatch(add(context))
    }
}

export default connect(null, mapDispatchToProps) (Write);

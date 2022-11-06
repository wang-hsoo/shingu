import React, { useState } from "react";
import { getAdmin, IAdmin } from "../service/BoardService";
import { useSetRecoilState } from "recoil";
import { isPopUp } from "../atom";

function Login(){
    const [chUse, setChUse] = useState<boolean>(false);
    const setPopUp = useSetRecoilState(isPopUp);

    


    return(
        <div>
            
        
            <button>회원가입</button>
            <button onClick={() => setPopUp((prev) => !prev)}>X</button>
        </div>
    )
}

export default Login;
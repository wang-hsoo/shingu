import axios from 'axios'; 
import { Ianswer } from './Interface';



const BOARD_API_BASE_URL = process.env.REACT_APP_SERVER_URL; 



export async function createAnswer(answer:Ianswer) {
    //새로운 답변 업데이트 
     axios.post(BOARD_API_BASE_URL + "/answerboard", answer);
 }

 export async function getAnswer(){
   return await (await axios.get(BOARD_API_BASE_URL + "/answerboard")).data;
 }

 
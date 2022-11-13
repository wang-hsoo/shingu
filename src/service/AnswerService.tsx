import axios from 'axios'; 



const BOARD_API_BASE_URL = "http://localhost:8080/api/answerboard"; 

export interface Ianswer{
    no: number,
    studentid: string,
    answercontents: string
}

export async function createAnswer(answer:Ianswer) {
    //새로운 답변 업데이트 
     axios.post(BOARD_API_BASE_URL, answer);
 }

 export async function getAnswer(no:number){
    axios.get(BOARD_API_BASE_URL + `/${no}`);
 }
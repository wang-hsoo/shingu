import axios from 'axios'; 
import { InewBoard } from './Interface';



const BOARD_API_BASE_URL = process.env.REACT_APP_SERVER_URL; 


 
export async function createBoard(board:InewBoard) {
    //새로운 게시물 업데이트 
     axios.post(BOARD_API_BASE_URL+"/board", board);
 }

 export async function updateBoard(no:number, board:InewBoard) {
    await axios.put(BOARD_API_BASE_URL + "/board/" + no, board);
}

 export async function getBoad() {
        //전체 게시물 받아오기
        const data = await (await axios.get(BOARD_API_BASE_URL+"/board")).data;
        return data;
 }

 export async function selectGetBoad(no:number) {
    //게시물 받아오기
    const data = await (await axios.get(BOARD_API_BASE_URL+"/board/" + no)).data;
    return data;
}

export async function delPost(no:string){
    return axios.delete(BOARD_API_BASE_URL+"/board/" + no);
}


export async function updateCount(no:number, board: InewBoard){
    await axios.put(BOARD_API_BASE_URL + "/board/" + no, board);
}




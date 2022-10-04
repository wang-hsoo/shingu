import axios from 'axios'; 


const BOARD_API_BASE_URL = "http://localhost:8080/api"; 


export interface InewBoard{
    studentid: string
    title: string,
    contents: string,
    addboard?: false,
    category: string,
    divisioncode: string,
}
 
export async function createBoard(board:InewBoard) {
    //새로운 게시물 업데이트 
     axios.post(BOARD_API_BASE_URL+"/board", board);
 }

 export async function getBoad() {
        //게시물 받아오기
        const data = await (await axios.get(BOARD_API_BASE_URL+"/board")).data;
        console.log(data);
        return data;
 }

export interface Icategory{
    category: string
    id: Number
}

 export async function getCategory() {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/category")).data;
    return data;
}







import axios from 'axios'; 



const BOARD_API_BASE_URL = "http://localhost:8080/api"; 


export interface InewBoard{
    no?:number,
    studentid: string
    title: string,
    contents: string,
    addboard?: boolean,
    category: string,
    divisioncode: string,
    createdtime?: string,
    answer?:boolean,
    answercontents?: string,
    counts?: string,
}
 
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

export interface Icategory{
    category: string
    id: Number
}

 export async function getCategory() {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/category")).data;
    return data;
}

export interface Idivision{
    divisioncode: number,
    divisionname: string,
    upctg: number
}

export async function getDivision() {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/division")).data;
    return data;
}







import axios from 'axios'; 



const BOARD_API_BASE_URL = "http://localhost:8080/api"; 


export interface InewBoard{
    no?: Number,
    divisioncode: String,
    category: String,
    title: String,
    contents: String,
    addboard: boolean,
    studentid: Number,
    createdtime?: String,
    counts: Number
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

export async function updateCount(no:number, board: InewBoard){
    await axios.put(BOARD_API_BASE_URL + "/board/" + no, board);
}

export interface IAdmin{
    adminid: string,
    adminpwd: string,
    divisioncode: number
}

export async function getAdmin() {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/admin")).data;
    return data;
}

export interface Iuser{
    no?: Number,
    studentid: String,
    username: String,
    password: String,
    divisioncode: String
}

export async function getUser(id:Number) {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/member/" + id)).data;
    return data;
}

export async function createUser( user: Iuser){
    axios.post(BOARD_API_BASE_URL + "/member/", user);
    
}

export async function getOneMemberFromUserId(id:Number) {
    const data =  await (await axios.get(BOARD_API_BASE_URL + "/member" + "?id=" + id)).data
    return data
}







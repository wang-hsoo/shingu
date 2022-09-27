import axios from 'axios'; 


const BOARD_API_BASE_URL = "http://localhost:8080/api/board"; 


 
 export default function createBoard(board) {
    //새로운 게시물 업데이트 
     return axios.post(BOARD_API_BASE_URL, board);
 }

 export default function getOneBoard(no) {
    //선택된 게시물 get
     return axios.get(BOARD_API_BASE_URL + "/" + no);
 }

 export default function updateBoard(no, board) {
    //관리자가 답변한 답변 업데이트
     return axios.put(BOARD_API_BASE_URL + "/" + no, board);
 }



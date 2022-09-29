import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";
import createBoard from "./api";
import updateBoard from "./api";


const post = createSlice({
    name: "postReducer",
    initialState: [],
    reducers: {
        add:(state, action) => {
            //게시물 작성
            const writePost = {
                board_title: action.payload.text, 
                board_content: action.payload.department,
                // board_created: action.payload.board_created,
                // board_answer: action.payload.board_answer,
                // division_code: action.payload.division_code,
                // department_code: action.payload.department_code,
                // category_code: action.payload.category_code,
                // student_id: action.payload.student_id
            }
            state.push(writePost);
            console.log(writePost);
            //데이터베이스 저장
            // createBoard(JSON.stringify(writePost));
        },
        rootAdd: (state, action) =>{
            //관리자 게시물 답변
            const answer = {
                board_answer_content: action.board_answer_content,
                board_answer_date: action.board_answer_date,
                board_answer: action.payload.board_answer
            }
            state.push(answer);
            updateBoard(action.payload.board_no, JSON.stringify(answer));
        },
        
    }
})

const store = configureStore({reducer: post.reducer})

export const {add, rootAdd} = post.actions;

export default store;
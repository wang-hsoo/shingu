import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";
import {createBoard} from "./service/BoardService";



const post = createSlice({
    name: "postReducer",
    initialState: [],
    reducers: {
        add:(state, action) => {
            //게시물 작성
            const writePost = {
                studentid: action.payload.studentid,
                title: action.payload.title,
                contents: action.payload.contents,
                addboard: 0,
                category: action.payload.category,
                divisioncode: action.payload.divisioncode,
            }
            state.push(writePost);
            //데이터베이스 저장
            createBoard(writePost);
        },
        rootAdd: (state, action) =>{
            //관리자 게시물 답변
            const answer = {
                board_answer_content: action.board_answer_content,
                board_answer_date: action.board_answer_date,
                board_answer: action.payload.board_answer
            }
            state.push(answer);
            // updateBoard(action.payload.board_no, JSON.stringify(answer));
        },
        
    }
})

const store = configureStore({reducer: post.reducer})

export const {add, rootAdd} = post.actions;

export default store;
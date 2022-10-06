import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";
import {createBoard, updateBoard} from "./service/BoardService";



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
                answer: action.payload.answer,
                answercontents: action.payload.answercontents,
            }
            state.push(answer);
            updateBoard(Number(action.payload.no), answer);
        },
        countAdd: (state, action) =>{
            const count = {
                counts : action.payload.counts
            }
            console.log(count);
        }
        
    }
})

const store = configureStore({reducer: post.reducer})

export const {add, rootAdd, countAdd} = post.actions;

export default store;
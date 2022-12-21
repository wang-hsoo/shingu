import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";
import {createBoard, getBoad, updateBoard, updateCount} from "./service/BoardService";


const post = createSlice({
    name: "postReducer",
    initialState: [],
    reducers: {
        add:(state, action) => {
            //게시물 작성
            const writePost = {
                studentid: Number(action.payload.studentid),
                title: action.payload.title,
                contents: action.payload.contents,
                addboard: 0,
                category: action.payload.category,
                divisioncode: action.payload.divisioncode,
                counts: 0,
                lookup: action.payload.lookup
            }
            state.push(writePost);
            //데이터베이스 저장

        },

        setPost:(state, action) => {
            state.push(...action.payload);
        }
    }
})


const store = configureStore({reducer: post.reducer})

export const {add, setPost} = post.actions;

export default store;
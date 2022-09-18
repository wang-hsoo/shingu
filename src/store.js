import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";


const post = createSlice({
    name: "postReducer",
    initialState: [],
    reducers: {
        add:(state, action) => {
            const writePost = {
                board_title: action.payload.board_title, 
                board_content: action.payload.board_content,
                board_created: action.payload.board_created
            }
            state.push(writePost);
            //데이터베이스 저장
        }
    }
})

const store = configureStore({reducer: post.reducer})

export const {add} = post.actions;

export default store;
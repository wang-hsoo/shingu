import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";


const post = createSlice({
    name: "postReducer",
    initialState: [],
    reducers: {
        add:(state, action) => {
            const writePost = {
                board_title: action.payload.board_title, 
                board_content: action.payload.board_content,
                board_created: action.payload.board_created,
                board_answer: action.payload.board_answer,
                division_code: action.payload.division_code,
                department_code: action.payload.department_code,
                category_code: action.payload.category_code,
                student_id: action.payload.student_id
            }
            state.push(writePost);
            //데이터베이스 저장
        },
        rootAdd: (state, action) =>{
            const answer = {
                board_no: action.payload.board_no,
                board_answer_content: action.board_answer_content,
                board_answer_date: action.board_answer_date,
                board_answer: action.payload.board_answer
            }
            state.push(answer)    
        }
        
    }
})

const store = configureStore({reducer: post.reducer})

export const {add, rootAdd} = post.actions;

export default store;
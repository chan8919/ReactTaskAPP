import { createSlice } from "@reduxjs/toolkit"
import type { IBoard } from "../../types";

type TBoardsState={
    modalActive:boolean;
    boardArray: IBoard[]
}

const initialState:TBoardsState ={
    modalActive : false,
    boardArray: [
        {
            boardId:'board-0',
            boardName:"첫 번째 게시물",
            lists:[
                {
                listId:"list-0",
                listName:"list 1",
                tasks: [{
                    taskId:"task-0",
                    taskName:"task 1",
                    taskDescription:"Desc",
                    taskOwner:"hwang"
                },
                {
                    taskId:"task-1",
                    taskName:"task 2",
                    taskDescription:"Desc",
                    taskOwner:"hwang"
                }  
                ]
            },
            {
                listId:"list-1",
                listName:"list 2",
                tasks: [{
                    taskId:"task-0",
                    taskName:"task 1",
                    taskDescription:"Desc",
                    taskOwner:"hwang"
                }
                    
                ]
            }
            ]
        
        }
    ]
}

const boardSlice = createSlice({
    name:'boards',
    initialState,
    reducers:{

    }
})

export const boardsReducer = boardSlice.reducer;
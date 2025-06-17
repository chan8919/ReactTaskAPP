import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
};

type TDeleteListAction = {
  boardId: string;
  listId: string;
};

type TAddListAction = {
  boardId: string;
  list: IList;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

const initialState: TBoardsState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫 번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "list 1",
          tasks: [
            {
              taskId: "task-0",
              taskName: "task 1",
              taskDescription: "Desc",
              taskOwner: "hwang",
            },
            {
              taskId: "task-1",
              taskName: "task 2",
              taskDescription: "Desc",
              taskOwner: "hwang",
            },
          ],
        },
        {
          listId: "list-1",
          listName: "list 2",
          tasks: [
            {
              taskId: "task-0",
              taskName: "task 1",
              taskDescription: "Desc",
              taskOwner: "hwang",
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board); // immer를 사용하기 때문에 불변성을 신경쓰지 않아도 괜찮다?
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(
                (list) => list.listId !== payload.listId
              ),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? { ...board, lists: board.lists.push(payload.list) }
          : board
      );
    },
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.map((board) =>
        board.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? { ...list, tasks: list.tasks.push(payload.task) }
                  : list
              ),
            }
          : board
      );
    },
  },
});

export const { addBoard, deleteList, setModalActive, addList, addTask } =
  boardSlice.actions;
export const boardsReducer = boardSlice.reducer;

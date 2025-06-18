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

type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type TDeleteBoardAction = {
  boardId: string;
};

type TSortAction = {
  boardIndex: number;
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
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
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(
        (board) => board.boardId !== payload.boardId
      );
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
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) =>
                        task.taskId === payload.task.taskId
                          ? payload.task
                          : task
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter(
                        (task) => task.taskId !== payload.taskId
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      //same list
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        const list = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );
        //변경시키는 아이템을 배열에서 지우고
        const card = list?.tasks.splice(payload.droppableIndexStart, 1);
        //새 위치에 넣기
        list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      }
      if (payload.droppableIdStart !== payload.droppableIdEnd) {
        const listStart = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );
        const card = listStart!.tasks.splice(payload.droppableIndexStart, 1);
        const listEnd = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdEnd
        );
        listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card);
      }
    },
  },
});

export const {
  addBoard,
  deleteList,
  setModalActive,
  addList,
  addTask,
  updateTask,
  deleteTask,
  deleteBoard,
  sort,
} = boardSlice.actions;
export const boardsReducer = boardSlice.reducer;

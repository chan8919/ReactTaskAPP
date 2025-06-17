

import './App.css'
import { appContainer, board, buttons } from './App.css'
import BoardList from './components/BoardList/BoardList'
import { useState } from 'react'
import ListsContainer from './components/ListContainer/ListsContainer';
import { useTypedSelector } from './hooks/redux';

function App() {
  const [ActiveBoardId, setActiveBoard] = useState('board-0');
  const boards = useTypedSelector(state => state.boards.boardArray);

  const getActiveBoard = boards.filter(board=>board.boardId===ActiveBoardId)[0];

  const lists = getActiveBoard.lists;

  return (
    <div className={appContainer}>
      <BoardList activeBoardId={ActiveBoardId} setActiveBoardId={setActiveBoard}/>
      <div className={board}>
        <ListsContainer lists = {lists} boardId={getActiveBoard.boardId}></ListsContainer>
      </div>
      <div className={buttons}>
        <button>
          이 게시판 삭제하기
        </button>
        <button>

        </button>
      </div>
    </div>
  )
}

export default App

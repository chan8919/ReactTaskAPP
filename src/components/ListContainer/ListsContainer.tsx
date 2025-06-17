import React, { type FC } from 'react'
import type { IList } from '../../types';
import List from '../List/List';
import ActionButton from '../ActionButton/ActionButton';
import { listsContainer } from './ListsContainer.css';

type TListContainerProps={
  boardId:string;
  lists:IList[];
}

const ListsContainer:FC<TListContainerProps> = ({
  boardId,
    lists
}) => {

  return (
    <div className={listsContainer}>
      {
        lists.map(list=>(
          <List key={list.listId} list={list} boardId={boardId}></List>
        ))
      }
      <ActionButton boardId={boardId} listId={""} list></ActionButton>
    </div>
  )
}

export default ListsContainer
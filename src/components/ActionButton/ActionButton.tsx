import React, { useState, type FC } from 'react'
import DropDownForm from './DropDownForm/DropDownForm';
import { IoIosAdd } from 'react-icons/io';
import { listButton, taskButton } from './ActionButton.css';

type TActionButtonProps={
  boardId:string;
  listId:string;
  list?:boolean;
}

const ActionButton:FC<TActionButtonProps> = ({
  boardId,
  listId,
  list
}
) => {
  const [isFormOpen, setisFormOpen] = useState(false);
  const buttonText = list ? "새로운 리스트 등록" : "새로운 일 등록";


  return isFormOpen?(
    <DropDownForm
    setIsFormOpen ={setisFormOpen}
    list={list?true:false}
    boardId={boardId}
    listId={listId}/>
  ):
  (<div className={list? listButton:taskButton}
  onClick={()=>setisFormOpen(true)}>
    <IoIosAdd/>
    <p>{buttonText}</p>
  </div>)
}

export default ActionButton
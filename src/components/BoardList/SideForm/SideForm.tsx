import React, { useState, type ChangeEvent ,type FC} from 'react'
import { FiCheck } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';
import { icon, input, sideForm } from './SideForm.css';

type TSideFormProps={
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideForm:FC<TSideFormProps> = (
  {setIsFormOpen}
) => {
  const [inputText, setinputText] = useState('');
  const dispatch = useTypedDispatch();
  const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
    setinputText(e.target.value);

  }
  const handleOnBlur=()=>{
    setIsFormOpen(false);

  }
  const handleClick = ()=>{
    if(inputText){
      dispatch(
        addBoard({
          board:{
            boardId:uuidv4(), 
          boardName:inputText,
          lists:[]
        }})
      )

      dispatch(
        addLog({
          logId:uuidv4(),
          logMessage:`게시판 등록: ${inputText}`,
          logAuthor:"User",
          logTimeStamp: String(Date.now()),
        })
      )

    }
  }
  return (
    <div className={sideForm}>
      <input
      className={input}
      autoFocus
      type='text'
      placeholder='새로운 게시판 등록하기'
      value={inputText}
      onChange={handleChange}
      onBlur={handleOnBlur} />
      <FiCheck className={icon} onMouseDown={handleClick}/>
    </div>
  )
}

export default SideForm


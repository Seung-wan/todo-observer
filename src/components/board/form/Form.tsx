import { AxiosError } from 'axios';
import { ChangeEvent, useState } from 'react';
import { ZodError, z } from 'zod';

import {
  addButton,
  buttonWrapper,
  cancelButton,
  form,
  textarea,
} from '@/components/board/form/form.css';
import { ADD_TODO, TodoType } from '@/hooks/useTodoStore';
import { todoService } from '@/services/todo';
type Props = {
  type: TodoType;
  showForm: boolean;
  setFalse: () => void;
  dispatch: (action: any) => void;
};

const todoSchema = z.string();

export default function Form({ type, showForm, setFalse, dispatch }: Props) {
  const [text, setText] = useState('');

  const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleClickAdd = async () => {
    try {
      todoSchema.parse(text);

      await todoService.postTodo({ todoType: type, todo: text });

      dispatch({
        type: ADD_TODO,
        payload: {
          todoType: type,
          order: 'front',
          text,
        },
      });

      setText('');
      setFalse();
    } catch (error) {
      if (error instanceof ZodError) {
        alert(error.message);
      }

      if (error instanceof AxiosError) {
        alert(error.message);
      }

      // logging
      alert('예상치 못한 에러가 발생했습니다.\n 잠시후 다시 실행해주세요.');
    }
  };

  const handleClickClose = () => {
    setFalse();
  };

  if (!showForm) {
    return null;
  }

  return (
    <form className={form}>
      <textarea
        className={textarea}
        value={text}
        onChange={handleChangeText}
        placeholder="Enter a note"
        rows={3}
        maxLength={500}
      />
      <div className={buttonWrapper}>
        <button className={addButton} onClick={handleClickAdd} type="button">
          Add
        </button>
        <button
          className={cancelButton}
          onClick={handleClickClose}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

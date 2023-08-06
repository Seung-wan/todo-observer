import { DragEvent, useState } from 'react';

import Header from '@/components/board/header';
import Form from '@/components/board/form';
import Item from '@/components/board/item';

import useBoolean from '@/hooks/useBoolean';

import { container, list } from '@/components/board.css';
import { ADD_TODO, DELETE_TODO, TodoType } from '@/hooks/useTodoStore';

export type Todo = string[];

type Props = {
  type: TodoType;
  todos: Todo;
  dispatch: (action: any) => any;
};

export default function Board({ type, todos, dispatch }: Props) {
  const { bool: showForm, setFalse, toggle } = useBoolean(false);
  const [draggingType, setDraggingType] = useState('');
  const [draggingTodo, setDraggingTodo] = useState('');

  const todosCount = todos.length;

  const handleDragStart = ({ type, text }: { type: string; text: string }) => {
    setDraggingType(type);
    setDraggingTodo(text);
  };

  const handleDragOver = (event: DragEvent<HTMLUListElement>) => {
    event.preventDefault();

    console.log('dragover');
  };

  const handleDrop = (event: DragEvent<HTMLUListElement>) => {
    event.preventDefault();

    dispatch({
      type: DELETE_TODO,
      payload: {
        todoType: draggingType,
        text: draggingTodo,
      },
    });

    dispatch({
      type: ADD_TODO,
      payload: {
        todoType: type,
        text: draggingTodo,
        order: 'front',
      },
    });
  };

  return (
    <div className={container}>
      <Header
        todosCount={todosCount}
        onClickToggleForm={toggle}
        onClickCloseForm={setFalse}
      />
      <Form
        showForm={showForm}
        setFalse={setFalse}
        type={type}
        dispatch={dispatch}
      />

      <ul className={list} onDragOver={handleDragOver} onDrop={handleDrop}>
        {todos?.map((todo, index) => {
          const key = type + todo + index;

          return (
            <Item
              key={key}
              type={type}
              todo={todo}
              index={index}
              dispatch={dispatch}
              onDragStart={handleDragStart}
            />
          );
        })}
      </ul>
    </div>
  );
}

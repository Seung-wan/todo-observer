import { PaperIcon, XMarkIcon } from '@/assets/svgs';
import EditModal from '@/components/board/editModal';

import {
  container,
  header,
  headerLeft,
  headerLeftText,
  time,
} from '@/components/board/item/item.css';
import { DELETE_TODO, TodoType } from '@/hooks/useTodoStore';
import { useState } from 'react';

type Props = {
  type: TodoType;
  todo: string;
  index: number;
  dispatch: (action: any) => void;
  onDragStart: ({ type, text }: { type: string; text: string }) => void;
};

export default function Item({
  type,
  todo,
  index,
  dispatch,
  onDragStart,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleClickDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    dispatch({
      type: DELETE_TODO,
      payload: {
        todoType: type,
        text: todo,
      },
    });
  };

  const handleDoubleClickItem = () => {
    setShowModal(true);
  };

  const handleClickCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <EditModal
        show={showModal}
        type={type}
        index={index}
        onClickCloseModal={handleClickCloseModal}
        dispatch={dispatch}
      />
      <li
        className={container}
        onDoubleClick={handleDoubleClickItem}
        draggable={true}
        onDragStart={() => onDragStart({ type, text: todo })}
      >
        <div className={header}>
          <div className={headerLeft}>
            <PaperIcon />
            <div className={headerLeftText}>{todo}</div>
          </div>

          <button onClick={handleClickDelete} type="button">
            <XMarkIcon />
          </button>
        </div>

        <time className={time}>2023-06-21</time>
      </li>
    </>
  );
}

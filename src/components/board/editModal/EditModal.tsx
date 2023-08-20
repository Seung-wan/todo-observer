import {
  active,
  body,
  container,
  footer,
  footerButton,
  header,
  modal,
  textarea,
} from '@/components/board/editModal/editModal.css';
import { CHANGE_TODO, TodoType } from '@/hooks/useTodoStore';
import { ChangeEvent, useState } from 'react';

type Props = {
  show: boolean;
  type: TodoType;
  index: number;
  onClickCloseModal: () => void;
  dispatch: (action: any) => void;
};

export default function EditModal({
  show,
  type,
  onClickCloseModal,
  index,
  dispatch,
}: Props) {
  const [text, setText] = useState('');

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClickSave = () => {
    dispatch({
      type: CHANGE_TODO,
      payload: {
        todoType: type,
        index,
        text,
      },
    });

    onClickCloseModal();
  };

  if (!show) {
    return null;
  }

  return (
    <div className={container}>
      <div className={modal}>
        <div className={header}>
          <div>Edit note</div>
          <button
            className="close__${this.type}__button close__button"
            type="button"
            onClick={onClickCloseModal}
          >
            <img className="xMark" src="src/assets/svgs/xMark.svg" />
          </button>
        </div>
        <div className={body}>
          <div>Note</div>
          <textarea
            className={textarea}
            onChange={handleChangeText}
            maxLength={500}
          ></textarea>
          <div className={footer}>
            <button
              className={text ? active : footerButton}
              onClick={handleClickSave}
              type="button"
            >
              Save note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

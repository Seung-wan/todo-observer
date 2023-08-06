import { PlusIcon, XMarkIcon } from '@/assets/svgs';

import {
  count,
  header,
  left,
  plusIcon,
  title,
  xMarkIcon,
} from '@/components/board/header/header.css';

type Props = {
  todosCount: number;
  onClickToggleForm: () => void;
  onClickCloseForm: () => void;
};

export default function Header({
  todosCount,
  onClickToggleForm,
  onClickCloseForm,
}: Props) {
  return (
    <div className={header}>
      <div className={left}>
        <div className={count}>{todosCount}</div>
        <div className={title}>해야할 일</div>
      </div>
      <div className="list__header__right">
        <button className={plusIcon} onClick={onClickToggleForm} type="button">
          <PlusIcon />
        </button>
        <button className={xMarkIcon} onClick={onClickCloseForm} type="button">
          <XMarkIcon />
        </button>
      </div>
    </div>
  );
}

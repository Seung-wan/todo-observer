import { act, renderHook } from '@testing-library/react';
import { describe } from 'vitest';

import useTodoStore, {
  ADD_TODO,
  CHANGE_TODO,
  DELETE_TODO,
} from '@/hooks/useTodoStore';

describe('useTodoStore', () => {
  it('스토어를 정상적으로 생성한다.', () => {
    const { result } = renderHook(() => useTodoStore());

    const { todos } = result.current;

    expect(todos).toEqual({
      todo: [],
      doing: [],
      done: [],
    });
  });

  it('todo를 1개 추가하면, todo 배열에 데이터가 추가된다.', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.dispatch({
        type: ADD_TODO,
        payload: {
          todoType: 'todo',
          text: 'React 공부',
          order: 'front',
        },
      });
    });

    expect(result.current.todos).toEqual({
      todo: ['React 공부'],
      doing: [],
      done: [],
    });
  });

  it('특정 todo를 수정하면, todo가 수정한 텍스트로 변경된다.', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.dispatch({
        type: ADD_TODO,
        payload: {
          todoType: 'todo',
          text: 'React 공부',
          order: 'front',
        },
      });
    });

    expect(result.current.todos).toEqual({
      todo: ['React 공부'],
      doing: [],
      done: [],
    });

    act(() => {
      result.current.dispatch({
        type: CHANGE_TODO,
        payload: {
          todoType: 'todo',
          index: 0,
          text: 'TypeScript 공부',
        },
      });
    });

    expect(result.current.todos).toEqual({
      todo: ['TypeScript 공부'],
      doing: [],
      done: [],
    });
  });

  it('특정 todo를 삭제하면, todo 배열에 특정 todo가 삭제된다.', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.dispatch({
        type: ADD_TODO,
        payload: {
          todoType: 'todo',
          text: 'React 공부',
          order: 'front',
        },
      });
    });

    expect(result.current.todos).toEqual({
      todo: ['React 공부'],
      doing: [],
      done: [],
    });

    act(() => {
      result.current.dispatch({
        type: DELETE_TODO,
        payload: {
          todoType: 'todo',
          text: 'React 공부',
        },
      });
    });

    expect(result.current.todos).toEqual({
      todo: [],
      doing: [],
      done: [],
    });
  });
});

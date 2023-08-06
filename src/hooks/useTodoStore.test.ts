import useTodoStore, { ADD_TODO } from '@/hooks/useTodoStore';
import { act, renderHook } from '@testing-library/react';
import { describe } from 'vitest';

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
});

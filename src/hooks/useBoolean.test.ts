import useBoolean from '@/hooks/useBoolean';
import { act, renderHook } from '@testing-library/react';
import { describe } from 'vitest';

describe('useBoolean', () => {
  it('bool값을 지정하지 않으면 기본값은 false가 된다.', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current.bool).toBeFalsy();
  });

  it('setTrue 함수를 실행하면 bool값이 true가 된다.', () => {
    const { result } = renderHook(() => useBoolean());

    act(() => {
      result.current.setTrue();
    });

    expect(result.current.bool).toBeTruthy();
  });

  it('setFalse 함수를 실행하면 bool값이 false가 된다.', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.bool).toBeFalsy();
  });

  it('toggle 함수를 실행하면 현재 bool값의 반대가 된다.', () => {
    const { result } = renderHook(() => useBoolean());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.bool).toBeTruthy();

    act(() => {
      result.current.toggle();
    });

    expect(result.current.bool).toBeFalsy();
  });
});

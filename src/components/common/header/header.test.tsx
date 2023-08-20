import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';

import Header from '@/components/common/header/Header';
import { COLORS } from '@/styles/colors';

describe('Header', () => {
  it('Header의 배경색은 BLACK이다.', () => {
    render(<Header />);

    const nav = screen.getByTestId('nav');

    expect(nav).toHaveStyle({ backgroundColor: COLORS.BLACK });
  });

  it('TODO라는 헤더의 텍스트가 보여진다.', () => {
    render(<Header />);

    const title = screen.getByText('TODO');

    expect(title).toBeInTheDocument();
  });
});

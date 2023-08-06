import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';

export const container = style({
  padding: 10,
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: COLORS.BLACK,
  color: 'white',
  fontSize: 24,
});

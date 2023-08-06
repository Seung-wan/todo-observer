import { style } from '@vanilla-extract/css';

export const container = style({
  padding: 8,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 12,
});

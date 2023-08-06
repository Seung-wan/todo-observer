import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const left = style({
  display: 'flex',
  alignItems: 'center',
});

export const count = style({
  width: 24,
  height: 24,
  borderRadius: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#aaa',
});

export const title = style({
  marginLeft: 4,
});

export const plusIcon = style({
  width: 20,
  height: 20,
});

export const xMarkIcon = style({
  width: 20,
  height: 20,
  marginLeft: 6,
});

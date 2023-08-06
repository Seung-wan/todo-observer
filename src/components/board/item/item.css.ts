import { style } from '@vanilla-extract/css';

export const container = style({
  marginTop: 8,
  padding: 8,
  borderRadius: 6,
  backgroundColor: '#fff',
  boxShadow: '3px 4px 13px 0px rgba(0, 0, 0, 0.25)',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
});

export const headerLeftText = style({
  marginLeft: 4,
});

export const time = style({
  display: 'block',
  marginTop: 12,
});

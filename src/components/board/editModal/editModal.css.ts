import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'block',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

export const modal = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 560,
  height: 420,
  backgroundColor: '#fff',
  borderRadius: 10,
  boxShadow: '0 2px 3px 0 rgba(34, 36, 38, 0.15)',
  transform: 'translateX(-50%) translateY(-50%)',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '18px 12px',
  backgroundColor: '#ddd',
});

export const body = style({
  padding: 12,
});

export const textarea = style({
  width: '100%',
  marginTop: 8,
  padding: 8,
  height: 300,
});

export const footer = style({
  marginTop: 8,
});

export const footerButton = style({
  padding: 8,
  backgroundColor: '#95d3a2',
  color: '#fff',
});

export const active = style({
  padding: 8,
  background: 'green',
  color: '#fff',
});

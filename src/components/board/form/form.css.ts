import { style } from '@vanilla-extract/css';

export const form = style({
  marginTop: 8,
});

export const textarea = style({
  width: '100%',
  padding: 6,
  resize: 'none',
});

export const buttonWrapper = style({
  display: 'flex',
  gap: 8,
});

export const addButton = style({
  height: 32,
  flex: 1,
  padding: 4,
  backgroundColor: '#95d3a2',
  borderRadius: 8,
  border: '1px solid gray',
});

export const cancelButton = style({
  height: 32,
  flex: 1,
  padding: 4,
  backgroundColor: '#fff',
  borderRadius: 8,
  border: '1px solid gray',
});

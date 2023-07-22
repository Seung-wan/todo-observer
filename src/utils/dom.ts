export const $ = (selector: string, element = document) => element.querySelector(selector);
export const $all = (selector: string, element: HTMLElement | Document = document) =>
  element.querySelectorAll(selector);

export const lockBodyScroll = (lock: boolean): void => {

  if (!document) return;

  document.body.style.overflowY = lock ? 'hidden' : 'scroll';

};

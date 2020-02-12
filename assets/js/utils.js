export const intiHoverAnimation = (type, removeSelector, addSelector, initEl, affectEle) => {
  initEl.addEventListener(type, () => {
    affectEle.classList.remove(removeSelector);
    affectEle.classList.add(addSelector);
  });
};
const animated = document.querySelector('.animated');

animated.addEventListener('mouseover', ({target}) => {

  target.classList.toggle('shake');
  
});

animated.ontransitionend = () => {
  console.log('Animation ended');
};

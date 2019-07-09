const animated = document.querySelectorAll('.animated');

animated.forEach(animate => {
  
  const animatedSpan = animate.querySelector('.animatedSpan');
  
  animate.addEventListener('mouseover', () => {
    animatedSpan.classList.add('mouseOver');
  });
  
  animate.addEventListener('mouseout', () => {
    animatedSpan.classList.remove('mouseOver');
  });

  animate.addEventListener('animationend', () => {
    animate.classList.toggle('shake');
  });

});



import {intiHoverAnimation} from './utils';

const animated = [].slice.call(document.querySelectorAll('.animated'));

animated.forEach(animate => {
  
  const animatedSpan = animate.querySelector('.animatedSpan');

  intiHoverAnimation('mouseover', 'mouseOff', 'mouseOver', animate, animatedSpan);
  intiHoverAnimation('mouseout', 'mouseOver', 'mouseOff', animate, animatedSpan);

  animate.addEventListener('animationend', () => animate.classList.toggle('shake'));

});



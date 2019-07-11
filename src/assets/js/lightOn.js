import {intiHoverAnimation} from './utils';

const animatedLight = [].slice.call(document.querySelectorAll('.animatedLight'));

animatedLight.forEach(animate => {

  const parentel = animate.parentElement.parentElement;
  const lightColour = parentel.querySelector('.lightColour');
  intiHoverAnimation('mouseover', 'lightOff', 'lightOn', animate, lightColour);
  intiHoverAnimation('mouseout', 'lightOn', 'lightOff', animate, lightColour);
  
});
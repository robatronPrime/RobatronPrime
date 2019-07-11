import {intiHoverAnimation} from './utils';

const animatedLight = [].slice.call(document.querySelectorAll('.animatedLight'));
const lightColourEls = [].slice.call(document.querySelectorAll('.lightColour'));

animatedLight.forEach(animate => {

  lightColourEls.forEach (el => {

    intiHoverAnimation('mouseover', 'lightOff', 'lightOn', animate, el);
    intiHoverAnimation('mouseout', 'lightOn', 'lightOff', animate, el);

  });
  
});
const cardValues = [
  '1A',
  '2A',
  '3A',
  '4A',
  '5A',
  '6A',
  '7A',
  '8A',
  '1B',
  '2B',
  '3B',
  '4B',
  '5B',
  '6B',
  '7B',
  '8B',
];
const deck = document.querySelector('.card-game__board');
const play = document.querySelector('.card-game__play');

let cards = [];
let started = false;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

//template for card
const cardTemplate = () => {
  let cardTemplate = document.createElement('div');
  cardTemplate.classList.add('card');
  return cardTemplate;
};

const buildCards = valueArray => {
  valueArray.forEach(value => {
    newCard = cardTemplate();
    newCard.setAttribute('data-value', `${value}`);
    cards.push(newCard);
  });
};

const displayCards = cardsArray => {
  cardsArray.forEach(card => deck.appendChild(card));
};

const gridMath = (cardsArray) => {
  i = 0;
  let cols = 3;
  if (window.screen.width > 600) cols = 4;
  if (window.screen.width > 900) cols = 8;

  cardsArray.forEach(card => {
    let top = 1 + 8 * Math.floor(i / cols);
    let left = 1 + 6 * (i % cols);
    card.style.left = `${left}rem`;
    card.style.top = `${top}rem`;
    card.style.transition = `left ${Math.floor(i + 10 / 2)}s, top ${Math.floor(i + 10 / 3)}s, transform 1s`;
    card.style.transitionDelay = `${i / 3}s`;
    i++;
    card.classList.add('card--deal');
  });
};

const deal = cardsArray => {
  play.addEventListener('click', () => {
    gridMath(cardsArray);
    started = true;
  });
};

const hideCard = (card) => {
  card.style.display = 'none';
}

const cardClick = () => {
  let card1 = '';
  
  document.addEventListener('click', ({ target }) => {
    if (started !== true) return; 
    if (!target.classList.contains('card')) return;

    target.animate([
      {transform: 'scale(1.2)'},
      {transform: 'rotate(0deg)'}
    ], {
      duration: 1000
    });
    target.style.backgroundImage = `url(../images/cards/${target.dataset.value}.png)`;

    if (card1 === '') {
      card1 = target;
    } else if (parseInt(card1.dataset.value) === parseInt(target.dataset.value) && target.classList !== card1.classList) {
      window.setTimeout(() => {
        hideCard(card1);
        hideCard(target);
        card1 = '';
      }, 1000);
    } else {
      window.setTimeout(() => {
        target.style.backgroundImage = 'url("../images/cards/back.png")';
        card1.style.backgroundImage = 'url("../images/cards/back.png")';
        card1 = '';
      }, 1000);
    }
  });
};

const init = () => {
  if (deck === null) return;
  shuffleArray(cardValues);
  buildCards(cardValues);
  displayCards(cards);
  deal(cards);
  cardClick();
};

init();

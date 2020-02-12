const cardValues = ["1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A", "1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B"];
const deck = document.querySelector('.card-game__board');

let cards = [];

//template for card
const cardTemplate = () => {
  let cardTemplate = document.createElement("div");
  cardTemplate.classList.add('card');
  return cardTemplate;
}

const buildCards = valueArray => {
  valueArray.forEach(value => {
    newCard = cardTemplate();
    newCard.setAttribute('data-value', `${value}`);
    cards.push(newCard);
  });
}

const displayCards = cardsArray => {
  cardsArray.forEach(card => deck.appendChild(card));
}

const gridMath = (cardsArray, cols) => {
  i = 0;
  cardsArray.forEach(card => {
    let top = 1 + 8 * Math.floor(i / cols);
    let left = 1 + 6 * (i % cols);
    card.style.left = `${left}rem`;
    card.style.top = `${top}rem`;
    i++;
  });
}

const deal = (cardsArray) => {
  deck.addEventListener('click', () => {
    if (window.screen.width < 600  ) {
      gridMath(cardsArray, 3);
    } else {
      gridMath(cardsArray, 4);
    }
  });
}

// init
buildCards(cardValues);
displayCards(cards);
deal(cards);

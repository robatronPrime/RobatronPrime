/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/cardGame.js":
/*!*******************************!*\
  !*** ./assets/js/cardGame.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var cardValues = ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '1B', '2B', '3B', '4B', '5B', '6B', '7B', '8B'];
var deck = document.querySelector('.card-game__board');
var play = document.querySelector('.card-game__play');
var cards = [];
var started = false;

function shuffleArray(array) {
  for (var _i = array.length - 1; _i > 0; _i--) {
    var j = Math.floor(Math.random() * (_i + 1));
    var _ref = [array[j], array[_i]];
    array[_i] = _ref[0];
    array[j] = _ref[1];
  }
} //template for card


var cardTemplate = function cardTemplate() {
  var cardTemplate = document.createElement('div');
  cardTemplate.classList.add('card');
  return cardTemplate;
};

var buildCards = function buildCards(valueArray) {
  valueArray.forEach(function (value) {
    newCard = cardTemplate();
    newCard.setAttribute('data-value', "".concat(value));
    cards.push(newCard);
  });
};

var displayCards = function displayCards(cardsArray) {
  cardsArray.forEach(function (card) {
    return deck.appendChild(card);
  });
};

var gridMath = function gridMath(cardsArray) {
  i = 0;
  var cols = 3;
  if (window.screen.width > 600) cols = 4;
  if (window.screen.width > 900) cols = 8;
  cardsArray.forEach(function (card) {
    var top = 1 + 8 * Math.floor(i / cols);
    var left = 1 + 6 * (i % cols);
    card.style.left = "".concat(left, "rem");
    card.style.top = "".concat(top, "rem");
    card.style.transition = "left ".concat(Math.floor(i + 10 / 2), "s, top ").concat(Math.floor(i + 10 / 3), "s, transform 1s");
    card.style.transitionDelay = "".concat(i / 3, "s");
    i++;
    card.classList.add('card--deal');
  });
};

var deal = function deal(cardsArray) {
  play.addEventListener('click', function () {
    gridMath(cardsArray);
    started = true;
  });
};

var hideCard = function hideCard(card) {
  card.style.display = 'none';
};

var cardClick = function cardClick() {
  var card1 = '';
  document.addEventListener('click', function (_ref2) {
    var target = _ref2.target;
    if (started !== true) return;
    if (!target.classList.contains('card')) return;
    target.animate([{
      transform: 'scale(1.2)'
    }, {
      transform: 'rotate(0deg)'
    }], {
      duration: 1000
    });
    target.style.backgroundImage = "url(../images/cards/".concat(target.dataset.value, ".png)");

    if (card1 === '') {
      card1 = target;
    } else if (parseInt(card1.dataset.value) === parseInt(target.dataset.value) && target.classList !== card1.classList) {
      window.setTimeout(function () {
        hideCard(card1);
        hideCard(target);
        card1 = '';
      }, 1000);
    } else {
      window.setTimeout(function () {
        target.style.backgroundImage = 'url("../images/cards/back.png")';
        card1.style.backgroundImage = 'url("../images/cards/back.png")';
        card1 = '';
      }, 1000);
    }
  });
};

var init = function init() {
  if (deck === null) return;
  shuffleArray(cardValues);
  buildCards(cardValues);
  displayCards(cards);
  deal(cards);
  cardClick();
};

init();

/***/ }),

/***/ "./assets/js/lightOn.js":
/*!******************************!*\
  !*** ./assets/js/lightOn.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./assets/js/utils.js");

var animatedLight = [].slice.call(document.querySelectorAll('.animatedLight'));
animatedLight.forEach(function (animate) {
  var parentel = animate.parentElement.parentElement;
  var lightColour = parentel.querySelector('.lightColour');
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["intiHoverAnimation"])('mouseover', 'lightOff', 'lightOn', animate, lightColour);
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["intiHoverAnimation"])('mouseout', 'lightOn', 'lightOff', animate, lightColour);
});

/***/ }),

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lightOn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lightOn */ "./assets/js/lightOn.js");
/* harmony import */ var _pokeballShake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pokeballShake */ "./assets/js/pokeballShake.js");
/* harmony import */ var _cardGame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cardGame */ "./assets/js/cardGame.js");
/* harmony import */ var _cardGame__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cardGame__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todo */ "./assets/js/todo.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_todo__WEBPACK_IMPORTED_MODULE_3__);
// Google Auth2.0
// import './clientObjInit';
// import './googleLoginAuth';





/***/ }),

/***/ "./assets/js/pokeballShake.js":
/*!************************************!*\
  !*** ./assets/js/pokeballShake.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./assets/js/utils.js");

var animated = [].slice.call(document.querySelectorAll('.animated'));
animated.forEach(function (animate) {
  var animatedSpan = animate.querySelector('.animatedSpan');
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["intiHoverAnimation"])('mouseover', 'mouseOff', 'mouseOver', animate, animatedSpan);
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["intiHoverAnimation"])('mouseout', 'mouseOver', 'mouseOff', animate, animatedSpan);
  animate.addEventListener('animationend', function () {
    return animate.classList.toggle('shake');
  });
});

/***/ }),

/***/ "./assets/js/todo.js":
/*!***************************!*\
  !*** ./assets/js/todo.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// selectors
var todoInput = document.querySelector('.todos__input');
var todoButton = document.querySelector('.todos__button');
var todoList = document.querySelector('.todos__list');
var filter = document.querySelector('.todos__select__filter');
var todoObj = new Object();
var localTodos; // functions

var addTodo = function addTodo(e) {
  // prevent form submition
  e.preventDefault();
  todoBuild(todoInput.value, todoObj.checked); // add to localStorage

  saveTodos(todoInput.value); //  clear value

  todoInput.value = '';
};

var todoBuild = function todoBuild(value, checked) {
  // todo div
  var todoDiv = document.createElement('div');
  todoDiv.classList.add('todo'); // create li

  var newTodo = document.createElement('li');
  newTodo.innerText = value;
  newTodo.classList.add('todo__item');
  todoDiv.appendChild(newTodo); // check button

  var completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"><i/>';
  completeButton.classList.add('complete-button');
  todoDiv.appendChild(completeButton); // create trash button

  var trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"><i/>';
  trashButton.classList.add('trash-button');
  todoDiv.appendChild(trashButton); // append to list

  todoList.appendChild(todoDiv); // mark as checked

  if (checked !== null && checked === true) {
    todoDiv.classList.add('completed');
  }
};

var deleteCheck = function deleteCheck(e) {
  var item = e.target;
  var todo = item.parentElement; // delete todo

  if (item.classList.contains('trash-button')) {
    // animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      return todo.remove();
    });
  }
};

var completeCheck = function completeCheck(e) {
  var item = e.target;
  var todo = item.parentElement; //  check mark

  if (item.classList.contains('complete-button')) {
    todo.classList.toggle('completed');
    localTodos = checkLocal(localTodos);
    localTodos.forEach(function (localTodo) {
      if (localTodo.text !== todo.querySelector('.todo__item').innerText) return;

      switch (localTodo.checked) {
        case false:
          localTodo.checked = true;
          break;

        case true:
          localTodo.checked = false;
          break;

        default:
          break;
      }
    });
    localStorage.setItem('todos', JSON.stringify(localTodos));
  }
};

var filterTodos = function filterTodos(e) {
  var todos = todoList.childNodes; // const filter = document.querySelector('.todos__select__filter');

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;

      case 'completed':
        todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none';
        break;

      case 'uncompleted':
        !todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none';
        break;

      default:
        break;
    }
  });
};

var checkLocal = function checkLocal(localTodos) {
  // check local storage
  localStorage.getItem('todos') === null ? localTodos = [] : localTodos = JSON.parse(localStorage.getItem('todos'));
  return localTodos;
};

var saveTodos = function saveTodos(todoText) {
  var checked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  localTodos = checkLocal(localTodos);
  todoObj.text = todoText;
  todoObj.checked = checked;
  localTodos.push(todoObj);
  localStorage.setItem('todos', JSON.stringify(localTodos));
};

var getTodos = function getTodos() {
  localTodos = checkLocal(localTodos);
  if (localTodos === null) return;
  localTodos.forEach(function (localTodo) {
    return todoBuild(localTodo.text, localTodo.checked);
  });
};

var removeLocalTodos = function removeLocalTodos(todo) {
  localTodos = checkLocal(localTodos);
  todoText = todo.querySelector('.todo__item').innerText; // remove the todo from the array with the index

  localTodos.splice(localTodos.indexOf(todoText), 1);
  localStorage.setItem('todos', JSON.stringify(localTodos));
}; // event listners


if (todoButton !== null && todoList !== null && filter !== null) {
  todoButton.addEventListener('click', addTodo);
  todoList.addEventListener('click', deleteCheck);
  todoList.addEventListener('click', completeCheck);
  filter.addEventListener('click', filterTodos);
  window.addEventListener('DOMContentLoaded', getTodos);
  window.addEventListener('DOMContentLoaded', getTodos);
  window.addEventListener('DOMContentLoaded', filterTodos);
}

/***/ }),

/***/ "./assets/js/utils.js":
/*!****************************!*\
  !*** ./assets/js/utils.js ***!
  \****************************/
/*! exports provided: intiHoverAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intiHoverAnimation", function() { return intiHoverAnimation; });
var intiHoverAnimation = function intiHoverAnimation(type, removeSelector, addSelector, initEl, affectEle) {
  initEl.addEventListener(type, function () {
    affectEle.classList.remove(removeSelector);
    affectEle.classList.add(addSelector);
  });
};

/***/ }),

/***/ "./assets/scss/main.scss":
/*!*******************************!*\
  !*** ./assets/scss/main.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*********************************************************!*\
  !*** multi ./assets/js/main.js ./assets/scss/main.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\roberts\Documents\personal-work\RobatronPrime\assets\js\main.js */"./assets/js/main.js");
module.exports = __webpack_require__(/*! C:\Users\roberts\Documents\personal-work\RobatronPrime\assets\scss\main.scss */"./assets/scss/main.scss");


/***/ })

/******/ });
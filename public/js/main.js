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

var cardValues = ["1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A", "1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B"];
var deck = document.querySelector('.card-game__board');
var cards = [];
var started = false; //template for card

var cardTemplate = function cardTemplate() {
  var cardTemplate = document.createElement("div");
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

var gridMath = function gridMath(cardsArray, cols) {
  i = 0;
  cardsArray.forEach(function (card) {
    var top = 1 + 8 * Math.floor(i / cols);
    var left = 1 + 6 * (i % cols);
    card.style.left = "".concat(left, "rem");
    card.style.top = "".concat(top, "rem");
    i++;
  });
};

var deal = function deal(cardsArray) {
  deck.addEventListener('click', function () {
    if (window.screen.width < 600) {
      gridMath(cardsArray, 3);
    } else {
      gridMath(cardsArray, 4);
    }
  });
};

var cardClick = function cardClick() {
  var cardsInplay = [];
  if (!started === true) return;
  document.addEventListener('click', function (_ref) {
    var target = _ref.target;
    if (!target.classList.contains('card')) return;
    cardsInplay.push(target);
    console.log(cardsInplay);
  });
};

var startGame = function startGame() {
  buildCards(cardValues);
  displayCards(cards);
  deal(cards);
  started = true;
  cardClick();
};

startGame();

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
// Google Auth2.0
// import './clientObjInit';
// import './googleLoginAuth';
// 




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

__webpack_require__(/*! /Users/robstow/Desktop/work/RobatronPrime/assets/js/main.js */"./assets/js/main.js");
module.exports = __webpack_require__(/*! /Users/robstow/Desktop/work/RobatronPrime/assets/scss/main.scss */"./assets/scss/main.scss");


/***/ })

/******/ });
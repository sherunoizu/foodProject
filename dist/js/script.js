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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener(`DOMContentLoaded`, () => {
  //Tabs
  const tabs = document.querySelectorAll(`.tabheader__item`),
        tabsContent = document.querySelectorAll(`.tabcontent`),
        tabsParent = document.querySelector(`.tabheader__items`);

  function hideTabContetn() {
    tabsContent.forEach(item => {
      item.classList.add(`hide`);
      item.classList.remove(`show`, `fade`);
    });
    tabs.forEach(tab => {
      tab.classList.remove(`tabheader__item_active`);
    });
  }

  function showTabContetn() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add(`show`, `fade`);
    tabsContent[i].classList.remove(`hide`);
    tabs[i].classList.add(`tabheader__item_active`);
  }

  hideTabContetn();
  showTabContetn();
  tabsParent.addEventListener(`click`, event => {
    const target = event.target;

    if (target && target.classList.contains(`tabheader__item`)) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContetn();
          showTabContetn(i);
        }
      });
    }
  }); //Timer

  const deadline = `2022-09-16`; //Разница между датами

  function getTimeRamaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / 1000 / 60 % 60);
      seconds = Math.floor(t / 1000 % 60);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector(`#days`),
          hours = timer.querySelector(`#hours`),
          minutes = timer.querySelector(`#minutes`),
          seconds = timer.querySelector(`#seconds`),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRamaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(`.timer`, deadline); // Modal

  const modalTrigger = document.querySelectorAll(`[data-modal]`),
        modal = document.querySelector(`.modal`);

  function openModal() {
    modal.classList.add(`show`);
    modal.classList.remove(`hide`);
    document.body.style.overflow = `hidden`;
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener(`click`, openModal);
  });

  function closeModal() {
    modal.classList.add(`hide`);
    modal.classList.remove(`show`);
    document.body.style.overflow = ``;
  }

  modal.addEventListener(`click`, e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });
  document.addEventListener(`keydown`, e => {
    if (modal.classList.contains(`show`) && e.code === `Escape`) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener(`scroll`, showModalByScroll);
    }
  }

  window.addEventListener(`scroll`, showModalByScroll); // Используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 60; //Курс рубля

      this.changeToRUB();
    }

    changeToRUB() {
      this.price *= this.transfer;
    }

    render() {
      //Формирование верстки обычно называют так
      const element = document.createElement(`div`);

      if (this.classes.length === 0) {
        this.element = `menu__item`;
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                <img src =${this.src} alt =${this.alt}>
                <h3 class = "menu__item-subtitle">${this.title}</h3>
                <div class = "menu__item-descr">${this.descr}</div>
                <div class = "menu__item-divider"></div>
                <div class = "menu__item-price">
                    <div class = "menu__item-cost"> Цена: </div>
                    <div class = "menu__item-total"><span>${this.price}</span> руб/день </div>
                </div>
            `;
      this.parent.append(element);
    }

  } // Реализация получения данных с сервера


  const getResource = async url => {
    // Функция отправки данных с БД в клиент
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json(); // Метод json() тоже построен на промисах, поэтому необходимо дождаться его ответа.
  };

  getResource('http://localhost:3000/menu') // При помощи запроса на сервер получаем массив с объектами
  .then(data => {
    // Обрабатываем полученный промис
    console.log(data);
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      // Перебираем каждый объект внутри массива и деструктуризируем его на отдельные свойства
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // Запускаем конструктор объекта карточки меню и передаем внутрь него все полученные из БД аргументы
    });
  }); //Реализация отправки данных на сервер

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => bindPostData(item)); // Привязка ко всем формам на сайте

  const postData = async (url, data) => {
    // async - указывает на то что внутри функции будет какой-то асинхронный код
    const res = await fetch(url, {
      // Fetch работает абсолютно асинхронно т.е. - в переменную резалт запишется какой то промис (но неизвестно какой, т.к. ответ от сервера ещё не получен)
      method: "POST",
      // AWAIT - ставится перед операциями, ответа которых необходимо дождаться
      headers: {
        // В таком случае в переменную резалт поместится какой то полученный ответ от сервера, а не просто undefind
        'Content-Type': 'application/json'
      },
      body: data
    });
    return await res.json(); // Метод json() тоже построен на промисах, поэтому необходимо дождаться его ответа.
  };

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      // Событие submit срабатывает каждый раз, когда форма отправляется
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; // form.append(statusMessage);

      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form); // Объект, позволяющий быстро получить данные из формы, в формате (ключ: значение)
      //Не будет работать если в инпутах формы (или другом интерактиве) не указан атрибут name
      //<-----Превращение FormData в JSON---->

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // formData.entries() - получаем данные с формы в формате массив массивов [[][]]
      // Object.fromEntries() - превращаем массив массивов в класический объект
      // JSON.stringify() - превращаем классический объект в JSON
      // <---------------------------------->

      postData('http://localhost:3000/requests', json) // Отсюда вернется промис, который мы с помощью зенов сможем нормально обработать
      .then(data => {
        // Обрабатываем статус запроса с помощью промисов
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        // Ошибка
        showThanksModal(message.failure);
      }).finally(() => {
        // Выполнится в любом случае
        form.reset(); // Очищаем форму
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add(`hide`);
    openModal();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class = "modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 5000);
  } // fetch('http://localhost:3000/menu')
  //     .then(data => data.json())
  //     .then(res => console.log(res));

});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map
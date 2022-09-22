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
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener(`DOMContentLoaded`, () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
    
    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
          
});

/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
    // Калькулятор

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem(`sex`)) {
        sex = localStorage.getItem(`sex`);
    } else {
        sex = 'female';
        localStorage.setItem(`sex`, sex);
    }

    if (localStorage.getItem(`ratio`)) {
        ratio = localStorage.getItem(`ratio`);
    } else {
        ratio = 1.375;
        localStorage.setItem(`ratio`, ratio);
    }


    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    // Функция рассчета
    function clacTotal() {
        // Функция будет работать только тогда, когда заполнены все значения

        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }


    }

    clacTotal();

    // Получаем статическую информацию с блоков
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                clacTotal();
            });
        });

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // Получаем информацию с каждого инпута

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            // Проверка на ввод не цифр
            if (input.value.match(/\D/g)) {
                input.style.boxShadow = '0px 4px 15px rgb(250 28 28 / 60%)';
            } else {
                input.style.boxShadow = '0px 4px 15px rgb(0 0 0 / 20%)';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            clacTotal();
        });


    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
    // Используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 60; //Курс рубля
            this.changeToRUB();
        }

        changeToRUB() {
            this.price *= this.transfer;
        }

        render() { //Формирование верстки обычно называют так
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
    }

    // Реализация получения данных с сервера

    const getResource = async (url) => { // Функция отправки данных с БД в клиент
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); // Метод json() тоже построен на промисах, поэтому необходимо дождаться его ответа.
    };

    getResource('http://localhost:3000/menu') // При помощи запроса на сервер получаем массив с объектами
        .then(data => { // Обрабатываем полученный промис
            console.log(data);
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => { // Перебираем каждый объект внутри массива и деструктуризируем его на отдельные свойства
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // Запускаем конструктор объекта карточки меню и передаем внутрь него все полученные из БД аргументы
            });
        });


    
}

module.exports = cards;

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms() {
    //Реализация отправки данных на сервер

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => bindPostData(item)); // Привязка ко всем формам на сайте

    const postData = async (url, data) => { // async - указывает на то что внутри функции будет какой-то асинхронный код
        const res = await fetch(url, { // Fetch работает абсолютно асинхронно т.е. - в переменную резалт запишется какой то промис (но неизвестно какой, т.к. ответ от сервера ещё не получен)
            method: "POST", // AWAIT - ставится перед операциями, ответа которых необходимо дождаться
            headers: { // В таком случае в переменную резалт поместится какой то полученный ответ от сервера, а не просто undefind
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json(); // Метод json() тоже построен на промисах, поэтому необходимо дождаться его ответа.
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => { // Событие submit срабатывает каждый раз, когда форма отправляется
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); // Объект, позволяющий быстро получить данные из формы, в формате (ключ: значение)
            //Не будет работать если в инпутах формы (или другом интерактиве) не указан атрибут name

            //<-----Превращение FormData в JSON---->
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // formData.entries() - получаем данные с формы в формате массив массивов [[][]]
            // Object.fromEntries() - превращаем массив массивов в класический объект
            // JSON.stringify() - превращаем классический объект в JSON
            // <---------------------------------->

            postData('http://localhost:3000/requests', json) // Отсюда вернется промис, который мы с помощью зенов сможем нормально обработать
                .then(data => { // Обрабатываем статус запроса с помощью промисов
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => { // Ошибка
                    showThanksModal(message.failure);
                }).finally(() => { // Выполнится в любом случае
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
    }
}

module.exports = forms;

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
    // Modal
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

    window.addEventListener(`scroll`, showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
    //Создание слайдера (Карусель)

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width; // Получаем примененные стили CSS
    const indicators = document.createElement('ol'),
        dots = [];

    // Для этого слайдера нам понадобится в HTML создать внутри обертки слайдеров ещё одну
    // slider-inner. Wrapper будет служить окном, через которое мы можем видеть весь
    // контент, подходящий под нужную ширину.
    // slider-inner - будет занимать ширину = колво слайдов * ширину слайда
    // При нажатии кнопок, мы будем передвигать inner относительно wrapper'a на
    // нужное колво пикселей (ширина одного слайда)

    let slideIndex = 1;
    let offset = 0; // отступ

    function totalInit() { // Рассчитывается общее кол-во слайдеров и передается значение в DOM
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    }

    function sliderInit() { // Инициализация слайдера-карусели
        slidesField.style.width = 100 * slides.length + `%`;
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';

        slides.forEach(slide => {
            slide.style.width = width; // Устанавливаем одинаковую ширину для всех слайдов
        });

        slider.style.position = 'relative';
        sliderDotsInit();
    }

    function sliderDotsInit() { // Инициализация точек-навигации слайдера
        indicators.classList.add('carousel-indicators');
        slider.append(indicators);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1); // Устанавливаем атрибут и нумерацию
            dot.classList.add('dot');

            if (i == 0) {
                dot.classList.add('active');
            }
            indicators.append(dot);
            dots.push(dot);
        }
    }

    function setCurrentSliderNumber() { // Устанавливает текущее значение активного слайдера в DOM
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }

        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex - 1].classList.add('active');

    }

    function deleteNotDiggits(str) {
        return +str.replace(/\D/g, '');
    }

    totalInit();
    sliderInit();

    next.addEventListener('click', () => {
        if (offset == deleteNotDiggits(width) * (slides.length - 1)) { // width = '500px' - необходимо превратить в числовой тип данных
            offset = 0;
        } else {
            offset += deleteNotDiggits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        setCurrentSliderNumber();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { // width = '500px' - необходимо превратить в числовой тип данных
            offset = deleteNotDiggits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDiggits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        setCurrentSliderNumber();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDiggits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrentSliderNumber();
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
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

    function showTabContetn(i = 0) {
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
    });
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
    //Timer
    const deadline = `2022-09-16`;

    //Разница между датами
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
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
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

    setClock(`.timer`, deadline);
}

module.exports = timer;

/***/ })

/******/ });
//# sourceMappingURL=script.js.map
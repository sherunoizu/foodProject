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

        if(!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); // Метод json() тоже построен на промисах, поэтому необходимо дождаться его ответа.
    };

    getResource('http://localhost:3000/menu') // При помощи запроса на сервер получаем массив с объектами
        .then(data => { // Обрабатываем полученный промис
            console.log(data);
            data.forEach(({img,altimg, title, descr, price}) => { // Перебираем каждый объект внутри массива и деструктуризируем его на отдельные свойства
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // Запускаем конструктор объекта карточки меню и передаем внутрь него все полученные из БД аргументы
            });
        });

    
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
            method: "POST",            // AWAIT - ставится перед операциями, ответа которых необходимо дождаться
            headers: {                 // В таком случае в переменную резалт поместится какой то полученный ответ от сервера, а не просто undefind
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


    //Создание слайдера (Карусель)

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width; // Получаем примененные стили CSS

    // Для этого слайдера нам понадобится в HTML создать внутри обертки слайдеров ещё одну
    // slider-inner. Wrapper будет служить окном, через которое мы можем видеть весь
    // контент, подходящий под нужную ширину.
    // slider-inner - будет занимать ширину = колво слайдов * ширину слайда
    // При нажатии кнопок, мы будем передвигать inner относительно wrapper'a на
    // нужное колво пикселей (ширина одного слайда)

    let slideIndex = 1;
    let offset = 0; // отступ

    totalInit();

    function totalInit () {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    }

    slidesField.style.width = 100 * slides.length + `%`;
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width; // Устанавливаем одинаковую ширину для всех слайдов
    });

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // width = '500px' - необходимо превратить в числовой тип данных
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { // width = '500px' - необходимо превратить в числовой тип данных
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }
    });


});
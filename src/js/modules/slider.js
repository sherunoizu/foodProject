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
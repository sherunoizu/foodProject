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
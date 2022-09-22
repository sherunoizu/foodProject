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
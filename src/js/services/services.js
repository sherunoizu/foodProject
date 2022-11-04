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

// Реализация получения данных с сервера

const getResource = async (url) => { // Функция отправки данных с БД в клиент
   const res = await fetch(url);

   if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
   }

   return await res.json(); // Метод json() тоже построен на промисах, поэтому необходимо дождаться его ответа.
};

export {postData};
export {getResource};
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const ApiEndpoint = {
  DATA: '/data',
  UPLOAD: '/',
};

export const getData = () => fetch(BASE_URL + ApiEndpoint.DATA)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .catch(() => {
    throw new Error('Не удалось получить данные');
  });

export const sendData = (body, onSuccess, onError, onFinally) => {
  fetch(BASE_URL + ApiEndpoint.UPLOAD, {
    method: 'POST',
    body: body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Не удалось отправить данные');
      }
    })
    .catch(() => {
      onError();
    })
    .finally(() => {
      onFinally();
    });
};

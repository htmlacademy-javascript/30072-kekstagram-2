export const getData = () => fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

export const sendData = (body, onSuccess, onError, onFinally) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
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

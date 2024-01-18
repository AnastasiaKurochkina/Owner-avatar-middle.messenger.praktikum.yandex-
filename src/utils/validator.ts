export const login = (value: string) => {
  const regex = /^[a-z0-9_-]{3,20}$/;
  if (!regex.test(value)) {
    return 'Неверный логин';
  }
  return false;
};

export const password = (value: string) => {
  const regex = /^(?=.*\d)(?=.*[A-Z]).{8,40}$/;
  if (!regex.test(value)) {
    return 'Неверный пароль';
  }
  return false;
};

export const email = (value: string) => {
  const regex = /^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'Неверная почта';
  }
  return false;
};

export const name = (value: string) => {
  const regex = /^[А-ЯЁA-Z][а-яёa-z]+$/;
  if (!regex.test(value)) {
    return 'Неверное имя';
  }
  return false;
};

export const message = (value: string) => {
  if (!value) {
    return 'Поле не должно быть пустым';
  }
  return false;
};

export const phone = (value: string) => {
  const regex = /^\+?[0-9]{10,15}$/;
  if (!regex.test(value)) {
    return 'Неверный номер телефона';
  }
  return false;
};

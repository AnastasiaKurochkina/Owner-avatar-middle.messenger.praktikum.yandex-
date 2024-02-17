import { ProfileInfo, ProfilePassword } from '../pages/profile/profile';

export const login = (value: string) => {
  if (value.length < 3 || value.length > 20) {
    return 'Недопустимое количество символов. Необходимо от 3 до 20';
  }
  const regex = /^[a-z0-9_-]{3,20}$/;
  if (!regex.test(value)) {
    return 'Неверный логин - не может состоять только из цифр и использовать спецсимволы';
  }
  return false;
};

export const password = (value: string) => {
  if (value.length < 8 || value.length > 40) {
    return 'Недопустимое количество символов. Необходимо от 8 до 40';
  }
  const regex = /^(?=.*\d)(?=.*[A-Z]).{8,40}$/;
  if (!regex.test(value)) {
    return 'Неверный пароль - обязательно хотя бы одна заглавная буква';
  }
  return false;
};

export const email = (value: string) => {
  const regex = /^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'Неверная почта - используйте знак @ и корректно укажите домен';
  }
  return false;
};

export const name = (value: string) => {
  const regex = /^[А-ЯЁA-Z][а-яёa-z]+$/;
  if (!regex.test(value)) {
    return 'Неверное имя - используйте латиницу/кирилицу и первую заглавную букву';
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
  if (value.length < 10 || value.length > 15) {
    return 'Недопустимое количество символов. Необходимо от 10 до 15';
  }
  const regex = /^\+?[0-9]{10,15}$/;
  if (!regex.test(value)) {
    return 'Неверный номер телефона - допустимо использовать только числа и знак "+"';
  }
  return false;
};

export const validProfileForm = (params: ProfileInfo) => {
  const errorLogin = login(params.login);
  const errorEmail = email(params.email);
  const errorFirstName = name(params.firstName);
  const errorSecondName = name(params.secondName);
  const errorDisplayName = name(params.displayName);
  const errorPhone = phone(params.phone);
  if (
    errorLogin
    || errorEmail
  || errorFirstName
    || errorSecondName
    || errorDisplayName
   || errorPhone
  ) {
    return false;
  }
  return true;
};

export const validProfilePasswors = (params: ProfilePassword) => {
  const errorOldPassword = password(params.oldPassword);
  const errorNewPassword = password(params.newPassword);
  const errorNewPasswordRepeat = password(params.newPasswordRepeat);
  if (errorOldPassword || errorNewPassword || errorNewPasswordRepeat) {
    return false;
  }
  return true;
};

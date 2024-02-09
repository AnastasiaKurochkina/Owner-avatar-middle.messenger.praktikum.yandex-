import AuthApi from '../api/auth';
import { CreateUser, LoginRequestData } from '../api/type';
import Router, { PAGES } from '../core/Router';
import { User } from '../type';
import { apiHasError } from '../utils/apiHasError';

const authApi = new AuthApi();

const getUser = async () => {
  const responseUser = await authApi.me();
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }
  return responseUser as User;
};

// авторизация
const signin = async (data: LoginRequestData) => {
  const response = await authApi.login(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();

  window.store.set({ user: me });
  Router.go(PAGES.messeges);
};

// регистрация
const signup = async (data: CreateUser) => {
  const response = await authApi.create(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  const me = await getUser();
  window.store.set({ user: me });
  Router.go(PAGES.messeges);
};

const logout = async () => {
  await authApi.logout();
  window.store.set({ user: null, chats: [] });
  Router.go(PAGES.login);
};

export {
  signin,
  signup,
  logout,
  getUser,
};

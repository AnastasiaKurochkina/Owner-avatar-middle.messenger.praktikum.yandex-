import AuthApi from '../api/auth';
import {
  APIError, CreateUser, LoginRequestData, UserDTO,
} from '../api/type';
import { navigate } from '../core/navigate';
import { apiHasError } from '../utils/apiHasError';

const authApi = new AuthApi();

const getUser = async () => {
  const responseUser = await authApi.me();
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }

  return responseUser as UserDTO;
};

// авторизация
const signin = async (data: LoginRequestData) => {
  const response = await authApi.login(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();

  window.store.set({ user: me });
  navigate('emails');
};

// регистрация
const signup = async (data: CreateUser) => {
  const response = await authApi.create(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();
  window.store.set({ user: me });
  navigate('emails');
};

const logout = async () => {
  await authApi.logout();
  window.store.set({ user: null, chats: [] });
  navigate('login');
};

export {
  signin,
  signup,
  logout,
  getUser,
};

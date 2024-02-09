import UserApi from '../api/user';
import { Password, User } from '../type';
import { apiHasError } from '../utils/apiHasError';
import { getUser } from './auth';

const userApi = new UserApi();

const editProfile = async (user: User) => {
  const response = await userApi.change(user);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();

  window.store.set({ user: me });
};

const editPassword = async (password: Password) => {
  const response = await userApi.changePassword(password);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();

  window.store.set({ user: me });
};

const changeAvatar = async (data: FormData) => {
  const response = await userApi.changeAvatar(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  window.store.set({ user: response });
};

export {
  editProfile,
  editPassword,
  changeAvatar,
};

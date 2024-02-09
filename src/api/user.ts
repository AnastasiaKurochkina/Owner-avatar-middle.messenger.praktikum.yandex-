import { HTTPTransport } from '../core/httpTransport';
import { Password, User } from '../type';
import { APIError } from './type';

const userApi = new HTTPTransport('/user');

export default class UserApi {
  async change(data: User): Promise<User | APIError> {
    return userApi.put<User>('/profile', { data });
  }

  async changePassword(data: Password): Promise<Password | APIError> {
    return userApi.put<Password>('/password', { data });
  }

  async changeAvatar(data: FormData): Promise<User | APIError> {
    return userApi.put<User>('/profile/avatar', { data });
  }
}

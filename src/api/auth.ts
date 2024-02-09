import { HTTPTransport } from '../core/httpTransport';
import { User } from '../type';
import {
  APIError, CreateUser, LoginRequestData, SignUpResponse,
} from './type';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
  async create(data: CreateUser): Promise<SignUpResponse | APIError> {
    return authApi.post<SignUpResponse>('/signup', { data });
  }

  async login(data: LoginRequestData): Promise<void | APIError> {
    return authApi.post('/signin', { data });
  }

  async me(): Promise<User | APIError> {
    return authApi.get('/user');
  }

  async logout(): Promise<void | APIError> {
    return authApi.post('/logout');
  }
}

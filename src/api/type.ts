import { User } from '../type';

export type APIError = {
    reason: string;
};

export type SignUpResponse = {
    id: number
}

export type CreateUser = Omit<User, 'avatar' | 'display_name' | 'id'> & {
    password: string
}

export type CreateChat = {
    title: string
}

export type LoginRequestData = {
    login: string,
    password: string
}

export type ChangeUser = {
  users: number[],
  chatId: number
}

export type ChatToken ={
  token: string;
}

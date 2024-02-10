import { HTTPTransport } from '../core/httpTransport';
import { Chat } from '../type';
import {
  APIError, ChangeUser, ChatToken, CreateChat,
} from './type';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
  async create(data: CreateChat): Promise<void | APIError> {
    return chatApi.post<void>('/', { data });
  }

  async getChats(): Promise<Chat[] | APIError > {
    return chatApi.get<Chat[]>('');
  }

  async addUser(data: ChangeUser): Promise<void | APIError > {
    return chatApi.put<void>('/users', { data });
  }

  async deleteUser(data: ChangeUser): Promise<void | APIError > {
    return chatApi.delete<void>('/users', { data });
  }

  async getToken(chatId: number): Promise<ChatToken | APIError > {
    return chatApi.post<ChatToken>(`/token/${chatId}`);
  }

  async changeAvatar(data: FormData): Promise<Chat | APIError > {
    return chatApi.put<Chat>('/avatar', { data });
  }

  async deleteChat(data: {chatId: number}): Promise<void | APIError > {
    return chatApi.delete<void>('/', { data });
  }
}

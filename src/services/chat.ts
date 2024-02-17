import ChatApi from '../api/chat';
import { createWebSocket } from '../api/socket';
import { ChangeUser } from '../api/type';
import { User } from '../type';
import { apiHasError } from '../utils/apiHasError';

const chatApi = new ChatApi();

const getChats = async () => {
  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  return responseChat;
};

const createChat = async (title: string) => {
  const response = await chatApi.create({ title });
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  const chats = await getChats();
  window.store.set({ chats });
};

const addUser = async (data:ChangeUser) => {
  const response = await chatApi.addUser(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
};

const deleteUser = async (data:ChangeUser) => {
  const response = await chatApi.deleteUser(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
};
const getChatToken = async (chatId: number) => {
  const response = await chatApi.getToken(chatId);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  return response;
};

const createWsChat = async (chatid: number, user: User) => {
  const response = await createWebSocket(chatid, user);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  const chats = await getChats();
  window.store.set({ chats });
};

const changeChatAvatar = async (data: FormData) => {
  const response = await chatApi.changeAvatar(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const chats = await getChats();
  window.store.set({ chats });
  if (window.store.getState().currentChat) {
    const activeChat = chats.find((chat) => chat.id === window.store.getState().currentChat?.id);
    window.store.set({
      currentChat: {
        id: window.store.getState().currentChat?.id || 0,
        name: window.store.getState().currentChat?.name || '',
        avatar: activeChat?.avatar,
      },
    });
  }
};

const deleteChat = async (data:{chatId: number}) => {
  const response = await chatApi.deleteChat(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  const chats = await getChats();
  window.store.set({ chats });
  window.store.set({ currentChat: null });
};

export {
  createChat,
  getChats,
  addUser,
  deleteUser,
  getChatToken,
  createWsChat,
  changeChatAvatar,
  deleteChat,
};

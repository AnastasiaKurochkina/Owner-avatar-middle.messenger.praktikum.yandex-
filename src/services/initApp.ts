import { PAGES } from '../core/Route';
import Router from '../core/Router';
import { getUser } from './auth';
import { getChats } from './chat';

const initApp = async () => {
  let me = null;
  try {
    me = await getUser();
  } catch (error) {
    Router.go(PAGES.login);
    return;
  }

  const chats = await getChats();
  window.store.set({ user: me, chats });

  if (window.location.pathname === PAGES.login || window.location.pathname === PAGES.signin) {
    Router.go(PAGES.messeges);
  }
};

const initChatPage = async () => {
  const chats = await getChats();
  window.store.set({ chats });
};

export {
  initApp,
  initChatPage,
};

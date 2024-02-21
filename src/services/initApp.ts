import { PAGES } from '../core/Route';
import { router } from '../main';
import { getUser } from './auth';
import { getChats } from './chat';

const initApp = async () => {
  let me = null;
  try {
    me = await getUser();
  } catch (error) {
    router.go(PAGES.login);
    return;
  }

  const chats = await getChats();
  window.store.set({ user: me, chats });

  if (window.location.pathname === PAGES.login || window.location.pathname === PAGES.signin) {
    router.go(PAGES.messeges);
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

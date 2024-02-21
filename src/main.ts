import * as Components from './components';
import { registerComponent } from './core/resgiterComponent';
import { AppState } from './type';
import { Store } from './core/Store';
import { initApp } from './services/initApp';
import Router from './core/Router';
import { PAGES } from './core/Route';
import * as Pages from './pages';

declare global {
  interface Window {
    store: Store<AppState>;
  }
  type Nullable<T> = T | null;
}
const initState: AppState = {
  error: null,
  user: null,
  isOpenDialogChat: false,
  isOpenAddUser: false,
  chats: [],
  currentChat: null,
  isModalAddUser: false,
  isModalDeleteUser: false,
  messages: [],
};

window.store = new Store<AppState>(initState);

registerComponent('Button', Components.Button);
registerComponent('InputField', Components.InputField);
registerComponent('Input', Components.Input);
registerComponent('SearchField', Components.SearchField);
registerComponent('ChatCard', Components.ChatCard);
registerComponent('MessageHeader', Components.MessageHeader);
registerComponent('Message', Components.Message);
registerComponent('MessageField', Components.MessageField);
registerComponent('ProfileInput', Components.ProfileInput);
registerComponent('ProfileButton', Components.ProfileButton);
registerComponent('ErrorLine', Components.ErrorLine);
registerComponent('MessageSend', Components.MessageSend);
registerComponent('Modal', Components.Modal);
registerComponent('DialogCreateChat', Components.DialogCreateChat);
registerComponent('Link', Components.Link);
registerComponent('ButtonComeback', Components.ButtonComeback);
registerComponent('OptionIcon', Components.OptionIcon);
registerComponent('ChatOption', Components.ChatOption);
registerComponent('UserAvatar', Components.UserAvatar);
registerComponent('ChatAvatar', Components.ChatAvatar);
registerComponent('Form', Components.Form);
registerComponent('Tooltip', Components.Tooltip);

const pages = {
  [PAGES.login]: Pages.LoginPage,
  [PAGES.signin]: Pages.SigninPage,
  [PAGES.messeges]: Pages.MessagePage,
  [PAGES.profile]: Pages.ProfilePage,
  [PAGES.profile_edit]: Pages.ProfileEdit,
  [PAGES.profile_password_edit]: Pages.ProfileEditPassword,
  [PAGES.not_found]: Pages.NotFound,
  [PAGES.server_error]: Pages.ServerError,
};

// eslint-disable-next-line import/no-mutable-exports
export let router: Router;

document.addEventListener('DOMContentLoaded', async () => {
  router = new Router('app');
  Object.entries(pages).forEach(([path, page]) => {
    router.use(path, page);
  });
  router.start();
  await initApp();
});

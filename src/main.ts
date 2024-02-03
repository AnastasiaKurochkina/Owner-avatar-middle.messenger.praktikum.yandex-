import Handlebars from 'handlebars';
import * as Components from './components';
// import { navigate } from './core/navigate';
import { registerComponent } from './core/resgiterComponent';
// import router from './core/Router';
import { AppState } from './type';
import { Store } from './core/Store';
import { initApp } from './services/initApp';

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
  chats: [],
};

window.store = new Store<AppState>(initState);

Handlebars.registerPartial('Form', Components.Form);
Handlebars.registerPartial('Tooltip', Components.Tooltip);
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

document.addEventListener('DOMContentLoaded', () => initApp());

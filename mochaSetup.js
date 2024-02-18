import { JSDOM } from 'jsdom';
import * as Components from './src/components';
import { registerComponent } from './src/core/resgiterComponent';

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

// jsdom
const jsdom = new JSDOM('<main id="app"></main>', { url: 'http://localhost:3000' });

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;

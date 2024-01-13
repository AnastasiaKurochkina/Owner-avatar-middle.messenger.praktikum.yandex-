import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import { messagesProps, profileProps } from './const.ts';

const pages = {
  login: [Pages.LoginPage, { title: 'Вход' }],
  signin: [Pages.SigninPage, { title: 'Регистрация' }],
  messages: [Pages.MessagePage, { messages: messagesProps }],
  profile: [Pages.ProfilePage, { profileInfo: profileProps }],
  notFound: [Pages.NotFound],
  serverError: [Pages.ServerError],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('messages'));

document.addEventListener('click', (e) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

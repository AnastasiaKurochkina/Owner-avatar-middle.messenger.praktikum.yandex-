import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
const messages = [
  {
      name: "Игорь",
      message: " Какой-то текст сообщения",
      time: "11:00"
  },
  {
      name: "Игорь",
      message: " Какой-то текст сообщения ааааааааааааааааааааааааааааа ааааааааааааааааааааааааааа аааааааааааааа",
      time: "12:00"
  },
  {
      name: "Игорь",
      message: " Какой-то текст сообщения",
      time: "13:00"
  },
  {
      name: "Игорь",
      message: " Какой-то текст сообщения",
      time: "15:00"
  }
]

const pages = {
  'login': [ Pages.LoginPage, {title: 'Вход'} ],
  'signin': [ Pages.SigninPage, {title: 'Регистрация'} ],
  'messages': [Pages.MessagePage, {messages: messages}],
  'errors': [Pages.ErrorsPage],
  'profile': [Pages.ProfilePage]
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('messages'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

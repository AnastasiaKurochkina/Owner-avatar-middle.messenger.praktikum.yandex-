import * as Pages from '../pages';

const pages = {
  login: Pages.LoginPage,
  signin: Pages.SigninPage,
  messages: Pages.MessagePage,
  profile: Pages.ProfilePage,
  notFound: Pages.NotFound,
  serverError: Pages.ServerError,
  allPages: Pages.AllPages,
};

export function navigate(page: string) {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '';
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Component = pages[page];
  const component = new Component();
  app?.append(component.getContent()!);
}

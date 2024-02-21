import { ErrorLine, InputField } from '../../components';
import Block from '../../core/Block';
import Router, { PAGES } from '../../core/Router';
// import { navigate } from '../../core/navigate';
import { signin } from '../../services/auth';
import * as validators from '../../utils/validator';

type Ref = {
  login: InputField;
  password: InputField;
  error: ErrorLine
};
interface ILoginPageProps {
  validate: { [key: string]: Function };
  onLogin: (event: Event) => void;
  onAuth: (event: Event) => void;
  error: string | null
}

export class LoginPage extends Block<ILoginPageProps, Ref> {
  constructor() {
    const router = new Router('app');
    super({
      error: null,
      validate: {
        login: validators.login,
        password: validators.password,
      },
      onLogin: (event: Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();
        const errorLogin = validators.login(login);
        const errorPassword = validators.password(password);
        if (errorLogin || errorPassword) {
          return;
        }

        console.log({
          login,
          password,
        });
        signin({
          login,
          password,
        }).catch((error) => this.refs.error.setProps({ error }));
      },
      onAuth: (event: Event) => {
        event.preventDefault();
        router.go(PAGES.signin);
      },
    });
  }

  protected render(): string {
    return `<div class="container">
      {{#Form }}
      <h1 class="header">Авторизация</h1>
      {{{ InputField label="Логин" name="login" type="text" errors="Неверный логин" ref="login" validate=validate.login }}}
      {{{ InputField label="Пароль" name="password" type="password" ref="password" validate=validate.password}}}
      <div class="footer">
        {{{ Button label="Войти" type="primary" page="messages" onClick=onLogin }}}
        {{{ Button label="Нет аккаунта?" type="link" page="signin" onClick=onAuth}}}
      </div>
      {{{ ErrorLine error=error ref="error"}}}
      {{/Form}}
   
  </div>`;
  }
}

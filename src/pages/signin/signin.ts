import { CreateUser } from '../../api/type';
import { ErrorLine, InputField } from '../../components';
import Block from '../../core/Block';
import Router, { PAGES } from '../../core/Router';
import { signup } from '../../services/auth';
import * as validators from '../../utils/validator';

type Ref = {
  email: InputField, // InputField это класс который описывает input component
  login: InputField,
  first_name: InputField,
  second_name: InputField,
  phone: InputField,
  password: InputField,
  password_repeat: InputField,
  error: ErrorLine
};
type TSigninPage = {};

export class SigninPage extends Block<TSigninPage, Ref> {
  constructor() {
    const router = new Router('app');
    super({
      error: null,
      validate: {
        login: validators.login,
        name: validators.name,
        email: validators.email,
        password: validators.password,
        phone: validators.phone,
      },
      onGoMessage: (event: Event) => {
        event.preventDefault();
        const email = this.refs.email.value();
        const login = this.refs.login.value();
        const firstName = this.refs.first_name.value();
        const secondName = this.refs.second_name.value();
        const phone = this.refs.phone.value();
        const password = this.refs.password.value();
        const passwordRepeat = this.refs.password_repeat.value();
        const errorLogin = validators.login(login);
        const errorPassword = validators.password(password);
        const errorPasswordRepeat = validators.password(passwordRepeat);
        const errorEmail = validators.email(email);
        const errorFirstName = validators.name(firstName);
        const errorSecondName = validators.name(secondName);
        const errorPhone = validators.phone(phone);
        if (errorLogin || errorPassword || errorPasswordRepeat || errorFirstName || errorSecondName || errorEmail || errorPhone) {
          return;
        }
        console.log({
          email,
          login,
          firstName,
          secondName,
          phone,
          password,
          passwordRepeat,
        });
        const newUser: CreateUser = {
          login: this.refs.login.value()!,
          first_name: this.refs.first_name.value()!,
          second_name: this.refs.second_name.value()!,
          email: this.refs.email.value()!,
          phone: this.refs.phone.value()!,
          password: this.refs.password.value()!,
        };
        signup(newUser).catch((error) => this.refs.error.setProps({ error }));
      },
      onGoLogin: (event: Event) => {
        event.preventDefault();
        router.go(PAGES.login);
      },
    });
  }

  protected render(): string {
    return `
      <div class="container">
        {{#Form }}
        <h1 class="header">Регистрация</h1>
        {{{ InputField label="Почта" type="text" name="email" ref="email"  validate=validate.email}}}
        {{{ InputField label="Логин" type="text" name="login" ref="login" validate=validate.login}}}
        {{{ InputField label="Имя" type="text" name="first_name" ref="first_name"  validate=validate.name}}}
        {{{ InputField label="Фамилия" type="text" name="second_name" ref="second_name"  validate=validate.name}}}
        {{{ InputField label="Телефон" type="text" name="phone" ref="phone"  validate=validate.phone}}}
        {{{ InputField label="Пароль" type="password" name="password" ref="password"  validate=validate.password}}}
        {{{ InputField label="Пароль (еще раз)" style="errors" type="password" errors="Пароли не совпадают" name="password-repeat" ref="password_repeat"  validate=validate.password}}}
        <div class="footer">
            {{{ Button label="Зарегистрироваться" type="primary" page="messages" onClick=onGoMessage}}}
            {{{ Button label="Войти" type="link" page="login" onClick=onGoLogin}}}
        </div>
        {{{ ErrorLine error=error ref="error"}}}
        {{/Form}}
      </div>
    `;
  }
}

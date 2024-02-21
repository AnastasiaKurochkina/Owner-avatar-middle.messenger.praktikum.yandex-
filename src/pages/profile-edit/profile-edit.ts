import Block from '../../core/Block';
import template from './profile-edit.hbs?raw';
import { ErrorLine, ProfileInput } from '../../components';
import * as validators from '../../utils/validator';
import { PAGES } from '../../core/Router';
import { connect } from '../../utils/connect';
import { User } from '../../type';
import { editProfile } from '../../services/user';
import { router } from '../../main';

export interface ProfileInfo {
  login: string;
  email: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
}

interface IProfileProps {
  onSaveProfile: (event: Event) => void;
  validate: { [key: string]: Function };
  user: User;
  error: string | null,
  onGoProfile: () => void;
}

type Ref = {
  email?: ProfileInput;
  login?: ProfileInput;
  first_name?: ProfileInput;
  second_name?: ProfileInput;
  display_name?: ProfileInput;
  phone?: ProfileInput;
  oldPassword?: ProfileInput;
  newPassword?: ProfileInput;
  newPasswordRepeat?: ProfileInput;
  error: ErrorLine,
};

export class ProfileEdit extends Block<IProfileProps, Ref> {
  constructor(props: IProfileProps) {
    super({
      ...props,
      error: null,
      validate: {
        login: validators.login,
        email: validators.email,
        name: validators.name,
        phone: validators.phone,
        password: validators.password,
      },
      onSaveProfile: (event: Event) => {
        event.preventDefault();
        const email = this.refs.email?.value();
        const login = this.refs.login?.value();
        const firstName = this.refs.first_name?.value();
        const secondName = this.refs.second_name?.value();
        const displayName = this.refs.display_name?.value();
        const phone = this.refs.phone?.value();
        if (
          !email
          || !login
          || !firstName
          || !secondName
          || !displayName
          || !phone
        ) {
          this.refs.error.setProps({ error: 'Проверьте корректность введеных данных' });
          return;
          // такое чувство, что есть ошибка в ручке /auth/signup, к примеру, отправляю в поле "second_name": "Test", а в ответ потом по роуту /auth/user получаю в поле "second_name": "T"
        }
        const data: ProfileInfo = {
          login,
          email,
          firstName,
          secondName,
          displayName,
          phone,
        };
        if (!validators.validProfileForm(data)) {
          this.refs.error.setProps({ error: 'Проверьте корректность введеных данных' });
          return;
        }
        const userNew = {
          id: this.props.user.id,
          avatar: this.props.user.avatar,
          login,
          email,
          first_name: firstName,
          second_name: secondName,
          display_name: displayName,
          phone,
        };
        editProfile(userNew).then(() => router.go(PAGES.profile));
        console.log({
          data,
        });
      },
      onGoProfile: () => {
        router.go(PAGES.profile);
      },
    });
  }

  protected render(): string {
    return template;
  }
}
export default connect(({ user }) => ({ user }))(ProfileEdit);

import Block from '../../core/Block';
import template from './profile.hbs?raw';
import { ProfileInput } from '../../components';
import * as validators from '../../utils/validator';
import { PAGES } from '../../core/Router';
import { User } from '../../type';
import { connect } from '../../utils/connect';
import { logout } from '../../services/auth';
import { router } from '../../main';

export interface ProfileInfo {
  login: string;
  email: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
}

export interface ProfilePassword {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

interface IProfileProps {
  validate: { [key: string]: Function },
  goProfileEdit: () => void,
  goProfilePasswordEdit: () => void;
  onGoMessages: () => void;
  logout: () => void,
  user: User
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
};

export class Profile extends Block<IProfileProps, Ref> {
  constructor(props: IProfileProps) {
    super({
      ...props,
      validate: {
        login: validators.login,
        email: validators.email,
        name: validators.name,
        phone: validators.phone,
        password: validators.password,
      },
      goProfileEdit: () => {
        router.go(PAGES.profile_edit);
      },
      goProfilePasswordEdit: () => {
        router.go(PAGES.profile_password_edit);
      },
      onGoMessages: () => {
        router.go(PAGES.messeges);
      },
      logout: () => {
        logout();
      },
    });
  }

  protected render(): string {
    return template;
  }
}
export default connect(({ user }) => ({ user }))(Profile);

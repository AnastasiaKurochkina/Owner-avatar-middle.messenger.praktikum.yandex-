import Block from '../../core/Block';
import template from './profile.hbs?raw';
import { profileProps, profilePropsEditPassword } from '../../const';
import { navigate } from '../../core/navigate';
import { ProfileInput } from '../../components';
import * as validators from '../../utils/validator';

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
  userInfo: {
    label: string;
    value: string;
    type: string;
    name: string;
  }[];
  editPassword: { label: string; value: string; type: string; name: string }[];
  onSaveProfile: (event: Event) => void;
  onSavePassword: (event: Event) => void;
  validate: { [key: string]: Function };
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
      userInfo: profileProps,
      editPassword: profilePropsEditPassword,
      onSaveProfile: (event: Event) => {
        event.preventDefault();
        const email = this.refs.email?.value();
        const login = this.refs.login?.value();
        const firstName = this.refs.first_name?.value();
        const secondName = this.refs.second_name?.value();
        const displayName = this.refs.display_name?.value();
        const phone = this.refs.phone?.value();
        if (!email || !login || !firstName || !secondName || !displayName || !phone) {
          return;
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
          return;
        }
        console.log({
          data,
        });
        navigate('messages');
      },
      onSavePassword: (event: Event) => {
        event.preventDefault();
        const oldPassword = this.refs.oldPassword?.value();
        const newPassword = this.refs.newPassword?.value();
        const newPasswordRepeat = this.refs.newPasswordRepeat?.value();
        if (!oldPassword || !newPassword || !newPasswordRepeat) {
          return;
        }
        const data: ProfilePassword = {
          oldPassword,
          newPassword,
          newPasswordRepeat,
        };
        if (!validators.validProfilePasswors(data)) {
          return;
        }
        console.log({
          oldPassword,
          newPassword,
          newPasswordRepeat,
        });
        navigate('messages');
      },
    });
  }

  protected render(): string {
    return template;
  }
}

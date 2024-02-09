import Block from "../../core/Block";
import template from "./profile-edit-password.hbs?raw";
import { ErrorLine, ProfileInput } from "../../components";
import * as validators from "../../utils/validator";
import Router, { PAGES } from "../../core/Router";
import { editPassword } from "../../services/user";
import { connect } from "../../utils/connect";

export interface ProfilePassword {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

interface IProfileProps {
  onSavePassword: (event: Event) => void;
  validate: { [key: string]: Function };
  goProfileEdit: () => void;
  goProfilePasswordEdit: () => void;
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
  error: ErrorLine;
};

export class ProfileEditPassword extends Block<IProfileProps, Ref> {
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
        editPassword({
          oldPassword,
          newPassword,
        })
          .then(() => Router.go(PAGES.profile))
          .catch((error) => this.refs.error.setProps({ error }));
      },
      goProfileEdit: () => {
        Router.go(PAGES.profile_edit);
      },
      goProfilePasswordEdit: () => {
        Router.go(PAGES.profile_password_edit);
      },
      onGoProfile: () => {
        Router.go(PAGES.profile);
      },
    });
  }

  protected render(): string {
    return template;
  }
}
export default connect(({ user }) => ({ user }))(ProfileEditPassword);

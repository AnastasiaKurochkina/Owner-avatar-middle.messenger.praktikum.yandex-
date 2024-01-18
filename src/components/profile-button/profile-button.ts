import Block from '../../core/Block';
import template from './profile-button.hbs?raw';

type TProfileButton = {}

export class ProfileButton extends Block<TProfileButton> {
  constructor(props: TProfileButton) {
    super(props);
  }

  protected render(): string {
    return template;
  }
}

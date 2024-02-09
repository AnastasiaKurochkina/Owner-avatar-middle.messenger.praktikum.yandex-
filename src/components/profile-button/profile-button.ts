import Block from '../../core/Block';

type TProfileButton = {}

export class ProfileButton extends Block<TProfileButton> {
  constructor(props: TProfileButton) {
    super(props);
  }

  protected render(): string {
    return `<ul class="profile-button">
    <li class="profile-button__item profile-button__item-blue">Изменить данные</li>
    <li class="profile-button__item profile-button__item-blue">Изменить пароль</li>
    <li
      class="profile-button__item profile-button__item-red"
      page="login"
    >Выйти</li>
  </ul>`;
  }
}

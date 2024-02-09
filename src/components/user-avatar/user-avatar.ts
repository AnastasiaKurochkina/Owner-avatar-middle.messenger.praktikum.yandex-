import { Input } from "..";
import Block from "../../core/Block";
import { changeAvatar } from "../../services/user";

interface Props {
  onChange?: () => void;
  img: string;
}
type Ref = {
  file: Input;
};

export class UserAvatar extends Block<Props, Ref> {
  constructor(props: Props) {
    super({
      ...props,
      img: props.img
        ? `https://ya-praktikum.tech/api/v2/resources${props.img}`
        : "assets/avatar.jpg",
      onChange: () => this.avatarDownload(),
    });
  }

  private avatarDownload() {
    const file = this.refs.file.element as HTMLInputElement;
    const avatar = file.files[0];
    const formData = new FormData();
    formData.append("avatar", avatar);
    changeAvatar(formData);
  }

  protected render(): string {
    const { img } = this.props;
    return `
    <div class="img__wrap">
  <img class="img__img"  src=${img} alt="avatar" />
  {{{Input className="input-file" name="avatar" type="file" ref="file" onChange=onChange}}}
  <p class="img__description">Загрузить аватар</p>
</div>

    `;
  }
}

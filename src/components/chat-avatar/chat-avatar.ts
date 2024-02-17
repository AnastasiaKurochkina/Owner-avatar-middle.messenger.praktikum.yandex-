import { Input } from '..';
import Block from '../../core/Block';
import { changeChatAvatar } from '../../services/chat';

interface Props {
  onChange?: () => void;
  img: string;
  chatId: number
}
type Ref = {
  fileChat: Input;
};

export class ChatAvatar extends Block<Props, Ref> {
  constructor(props: Props) {
    super({
      ...props,
      img: props.img
        ? `https://ya-praktikum.tech/api/v2/resources${props.img}`
        : 'assets/avatar.jpg',
      onChange: () => this.avatarDownload(),
    });
  }

  private avatarDownload() {
    const file = this.refs.fileChat.element as HTMLInputElement;
    if (file.files?.length) {
      const avatar = file.files[0];
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('chatId', String(this.props.chatId));
      changeChatAvatar(formData);
    }
  }

  protected render(): string {
    const { img } = this.props;
    return `
    <div class="avatar__wrap">
      <img class="avatar__img"  src=${img} alt="avatar" />
      {{{Input className="input-file" name="avatar" type="file" ref="fileChat" onChange=onChange}}}
    </div>`;
  }
}

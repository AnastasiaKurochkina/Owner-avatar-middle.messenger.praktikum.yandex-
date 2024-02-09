import Block from '../../core/Block';
import { User } from '../../type';
import { connect } from '../../utils/connect';

interface IMessageProps {
 type: 'incoming' | 'outcoming',
 time: string,
 text: string,
 checked: boolean,
 img: string,
 userId: number
user: User
}

export class Message extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render(): string {
    const {text, userId, user} = this.props;
    const time = new Date(this.props.time);
    const resTime = [time.getHours(), time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()].join(':')
    // return template;
    return `
    <div class="message-item ${userId === user.id ? 'outcoming' : 'incoming' }">

    <div class="message-content message-content__${userId === user.id ? 'outcoming' : 'incoming' }">
      <p>${text}</p>
      <div class="message-content__detail">
        <span class="message-content__detail-time">${resTime}</span>
        {{#if checked}}
          <img src="assets/checked.svg" alt="Прочитано" />
        {{/if}}
      </div>
    </div>

  {{#if img}}
    <img
      class="message-content message-content__img"
      src="{{img}}"
      alt="Прикрепленное изображение к сообщению"
    />
  {{/if}}
</div>`;
  }
}
export default connect(({ user }) => ({user }))(Message);

import Block from '../../core/Block';
import { User } from '../../type';
import { connect } from '../../utils/connect';
import template from './chat-card.hbs?raw';

interface IChatCardProps {
  id: number,
  name: string,
  time: string,
  message: string,
  count: number,
  isYourMessage: boolean,
  user?: User,
  onClick: (id: number, name:string) => void;
  events?: { click: () => void };
}

export class ChatCard extends Block<IChatCardProps> {
  constructor(props: IChatCardProps) {
    super({
      ...props,
      time: [new Date(props.time).getHours(), new Date(props.time).getMinutes() < 10 ? `0${new Date(props.time).getMinutes()}` : new Date(props.time).getMinutes()].join(':'),
      isYourMessage: props.user ? props.user.id === window.store.getState().user?.id : false,
    });
  }

  protected init(): void {
    this.props.events = {
      click: () => this.props.onClick(this.props.id, this.props.name),
    };
  }

  protected render(): string {
    return template;
  }
}

export default connect(({ chats, user }) => ({ chats, user }))(ChatCard);

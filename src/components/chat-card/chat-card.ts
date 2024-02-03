import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import template from './chat-card.hbs?raw';

interface IChatCardProps {
  name: string,
  time: string,
  message: string,
  count: number,
  isYourMessage: boolean
}

export class ChatCard extends Block<IChatCardProps> {
  constructor(props: IChatCardProps) {
    super(props);
  }

  protected render(): string {
    return template;
  }
}

export default connect(({ chats, user }) => ({ chats, user }))(ChatCard);

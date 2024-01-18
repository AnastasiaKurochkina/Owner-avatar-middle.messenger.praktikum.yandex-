import Block from '../../core/Block';
import template from './messages.hbs?raw';
import { messagesProps } from '../../const';
import * as validators from '../../utils/validator';
import { MessageField } from '../../components';

interface IMessapePageProps {
  chatList: {
    name: string;
    message: string;
    time: string;
    isYourMessage?: boolean;
    count?: number;
  }[];
  currentChat: {
    text?: string;
    type: 'outcoming' | 'incoming';
    time: string;
    checked?: boolean;
    img?: string;
  }[];
  validate: { [key: string]: Function };
  onSend: () => void;
}
type Ref = {
  message: MessageField;
};

export class MessagesPage extends Block<IMessapePageProps, Ref> {
  constructor(props: IMessapePageProps) {
    super({
      ...props,
      chatList: messagesProps.messages,
      currentChat: messagesProps.message,
      validate: {
        message: validators.message,
      },
      onSend: () => {
        const message = this.refs.message.value();
        const error = validators.message(message);
        if (error) {
          return;
        }

        console.log({
          message,
        });
      },
    });
  }

  protected render(): string {
    return template;
  }
}

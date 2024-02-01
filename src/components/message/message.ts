import Block from '../../core/Block';
import template from './message.hbs?raw';

interface IMessageProps {
 type: 'incoming' | 'outcoming',
 time: string,
 text: string,
 checked: boolean,
 img: string

}

export class Message extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render(): string {
    return template;
  }
}

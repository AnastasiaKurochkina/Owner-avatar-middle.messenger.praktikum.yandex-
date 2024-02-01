import Block from '../../core/Block';
import template from './message-header.hbs?raw';

type IMessageHeaderProps = {}

export class MessageHeader extends Block<IMessageHeaderProps> {
  constructor(props: IMessageHeaderProps) {
    super(props);
  }

  protected render(): string {
    return template;
  }
}

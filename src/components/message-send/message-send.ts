import Block from '../../core/Block';

interface IMessageSendProps {
  events?: {click: (() => void) | undefined};
  onClick?: () => void,
}

export class MessageSend extends Block<IMessageSendProps> {
  constructor(props: IMessageSendProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render(): string {
    return `
    <button class="messages__send-button">
      <i class="fa fa-long-arrow-right arrow" aria-hidden="true"></i>
    </button>
`;
  }
}

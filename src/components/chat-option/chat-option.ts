import Block from '../../core/Block';

interface Props {
  src: string,
  label: string,
  events?: {click: (() => void) | undefined};
  onClick?: () => void,
}

export class ChatOption extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render(): string {
    const { src, label } = this.props;
    return (`
    <div class="tooltip-option">
    <img src=${src} alt="${src}" />
    <span class="option-name">${label}</span>
  </div>
  `);
  }
}

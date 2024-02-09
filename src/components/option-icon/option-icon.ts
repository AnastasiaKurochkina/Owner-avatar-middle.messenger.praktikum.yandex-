import Block from '../../core/Block';

interface Props {
  events?: {click: (() => void) | undefined};
  onClick?: () => void,
}

export class OptionIcon extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render(): string {
    return (`
    <i class="fa fa-list-ul" aria-hidden="true"></i>
  `);
  }
}

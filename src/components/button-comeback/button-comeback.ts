import Block from '../../core/Block';

interface IPropsButton {
  events?: {click: (() => void) | undefined};
  onClick?: () => void,
}

export class ButtonComeback extends Block<IPropsButton> {
  constructor(props: IPropsButton) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render(): string {
    return (`
    <div class="comeback">
    <div class="comeback__arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i>
    </div>
</div>
  `);
  }
}

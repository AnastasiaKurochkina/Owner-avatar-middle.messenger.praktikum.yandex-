import Block from '../../core/Block';

interface IPropsButton {
  type: 'primary' | 'link',
  label: string,
  page: string,
  events?: {click: (() => void) | undefined};
  onClick?: () => void,
}

export class Button extends Block<IPropsButton> {
  constructor(props: IPropsButton) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render(): string {
    const { type, label, page } = this.props;
    return (`
      <button type="button" class="button button__${type}" page="${page}">
          ${label}
      </button>
  `);
  }
}

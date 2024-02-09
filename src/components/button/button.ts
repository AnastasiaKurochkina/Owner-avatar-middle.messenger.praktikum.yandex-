import Block from '../../core/Block';

interface IPropsButton {
  type: 'primary' | 'link',
  label: string,
  page: string,
  className?: string
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
    const { type, label, page, className } = this.props;
    return (`
      <button type="button" class="button button__${type}  ${className ? `${className}` : ''} " page="${page}">
          ${label}
      </button>
  `);
  }
}

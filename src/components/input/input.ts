import Block from '../../core/Block';

interface IInputProps {
  name: string;
  type: string;
  value?: string,
  className: string,
  placeholder: string,
  onBlur?: () => void,
  events?: {blur: (() => void) | undefined}
}

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  protected render(): string {
    const {
      name, type, value, className, placeholder,
    } = this.props;
    return `
        <input
        class=${className}
        ${placeholder ? `value="${placeholder}"` : ''}
        ref="input"
        name=${name}
        type=${type}
        ${value ? `value="${value}"` : ''}
      />
        `;
  }
}

import Block from '../../core/Block';

interface IInputProps {
  name: string;
  type: string;
  value?: string,
  className: string,
  placeholder: string,
  disabled?: boolean,
  onBlur?: () => void,
  onChange?: () => void,
  events?: {blur: (() => void) | undefined, change: (() => void) | undefined},
  error?: string | undefined,
  id: string
}

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        change: props.onChange
      },
    });
  }

  protected render(): string {
    const {
      name, type, value, className, placeholder, disabled, id
    } = this.props;
    return `
        <input
        class=${className}
        ${placeholder ? `value="${placeholder}"` : ''}
        ref="input"
        name=${name}
        type=${type}
        ${value ? `value="${value}"` : ''}
        ${disabled ? 'disabled' : ''}
        ${id ? `id=${id}` : ''}
      />
        `;
  }
}

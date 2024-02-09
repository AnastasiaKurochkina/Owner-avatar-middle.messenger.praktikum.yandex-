import Block from '../../core/Block';
import { Input } from '../input';

type IMessageFieldProps = {
  validate?: (value: string) => void | string;
  onBlur?: () => void;
};

type Ref = {
  input: MessageField;
  errorLine: Input;
};

export class MessageField extends Block<IMessageFieldProps, Ref> {
  constructor(props: IMessageFieldProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  public value() {
    return (this.refs.input.element as HTMLInputElement).value;
  }

  private validate() {
    const value = (this.refs.input.element as HTMLInputElement)?.value;
    const error = this.props.validate?.(value);
    if (error) {
      this.refs.errorLine?.setProps({ error });
      return false;
    }
    this.refs.errorLine?.setProps({ error: undefined });
    return true;
  }

  protected render(): string {
    return `
    <div class="message-field-container">
        {{{Input
            name="message"
            className="message-field"
            type="text"
            ref="input"
            placeholder="Сообщение"
            onBlur=onBlur
            id="message-field"
        }}}
        {{{ErrorLine error=error ref="errorLine"}}}
    </div>
`;
  }
}

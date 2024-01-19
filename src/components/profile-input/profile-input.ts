import { ErrorLine } from '..';
import Block from '../../core/Block';
import { Input } from '../input';

interface IProfileInputProps {
  name: string;
  label: string;
  value: string;
  type: string;
  validate?: (value: string) => string;
  onBlur?: () => void;
}
type Ref = {
  input: Input;
  errorLine: ErrorLine;
};

export class ProfileInput extends Block<IProfileInputProps, Ref> {
  constructor(props: IProfileInputProps) {
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
    const {
      name, label,
    } = this.props;
    return ` 
    <div>
      <div class="profile-field">
        <label class="profile-field__label" for=${name}>${label}</label>
        {{{Input
          className="profile-field__input"
          type=type
          name=name
          value=value
          ref="input"
          onBlur=onBlur
        }}}
      </div>
    {{{ErrorLine error=error ref="errorLine"}}}
  </div>`;
  }
}

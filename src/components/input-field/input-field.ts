import { Input } from '../input';
import Block from '../../core/Block';
import { ErrorLine } from '..';

interface IInputFieldProps {
  name: string;
  type: string;
  label: string;
  errors: string;
  onBlur?: () => void;
  validate?: (value: string) => void | string;
}
type Ref = {
  input: Input,
  errorLine: ErrorLine;
};

export class InputField extends Block<IInputFieldProps, Ref> {
  constructor(props: IInputFieldProps) {
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
        <div class="input">
        <label class="input__container" for={{name}}>
          {{{Input className="input__element" name=name type=type ref="input" onBlur=onBlur}}}
          <div class="input__label">{{label}}</div>
        </label>
        {{{ErrorLine error=error ref="errorLine"}}}
      </div>      
        `;
  }
}

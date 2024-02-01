import Block from '../../core/Block';

interface IErorLineProps {
  error?: string | undefined
}

export class ErrorLine extends Block<IErorLineProps> {
  constructor(props: IErorLineProps) {
    super(props);
  }

  protected render(): string {
    return (`
    <span class="input__error">{{error}}</span>
    `);
  }
}

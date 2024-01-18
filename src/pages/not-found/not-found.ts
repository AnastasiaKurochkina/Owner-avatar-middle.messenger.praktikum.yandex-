import Block from '../../core/Block';

type INotFoundProps = {}
export class NotFound extends Block<INotFoundProps> {
  constructor(props: INotFoundProps) {
    super(props);
  }

  protected render(): string {
    return `<div class="container-error">
    <h1 class="container-error__code">404</h1>
    <h2 class="container-error__description">Не туда попали</h2>
    <a class="container-error__link">Назад к чатам</a>
  </div>
  `;
  }
}

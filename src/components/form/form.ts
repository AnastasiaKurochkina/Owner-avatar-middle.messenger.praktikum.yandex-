import Block from '../../core/Block';

interface Props {}

export class Form extends Block<Props> {
  protected render(): string {
    return `<form class="form">
   </form>`;
  }
}

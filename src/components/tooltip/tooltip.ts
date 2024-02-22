import Block from '../../core/Block';

interface Props {}

export class Tooltip extends Block<Props> {
  protected render(): string {
    return `<div class="tooltip" style="{{style}}">
 </div>`;
  }
}

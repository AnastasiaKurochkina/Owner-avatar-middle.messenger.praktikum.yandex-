import Block from '../../core/Block';

interface Props {
    open: boolean
}
type Refs = {}

export class Modal extends Block<Props, Refs> {
  protected render(): string {
    return '<dialog class="{{#if open}}dialog{{/if}}" {{#if open}}open{{/if}} ></dialog> ';
  }
}

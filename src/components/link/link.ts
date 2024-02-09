import Block from "../../core/Block";

interface ILinkProps {
  label: string | undefined;
  onClick: () => void;
  events?: { click: () => void };
}

export class Link extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render(): string {
    return `
    <span class="label-link">{{label}}</span>
    `;
  }
}

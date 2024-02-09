import { ErrorLine, InputField } from '..';
import Block from '../../core/Block';
import { connect } from '../../utils/connect';

interface Props {
  isOpenDialogChat: boolean;
  onSave: () => void;
  onClose: () => void;
  error: string;
}
type Ref = {
  chatTitle: InputField;
  errorLine: ErrorLine;
};

export class DialogCreateChat extends Block<Props, Ref> {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  public getChatTitle() {
    return this.refs.chatTitle.value();
  }

  public setError(error: string) {
    this.refs.errorLine?.setProps({ error });
  }

  protected render(): string {
    return `
    {{#Modal open=isOpenDialogChat}}
    <form method="dialog">
        <h3>Создать новую переписку</h3>
        {{{ InputField label="Название чата" type="text" ref="chatTitle"}}}
        {{{ ErrorLine error=error ref="errorLine"}}}
        <div>
            {{{ Button
                label="создать"
                type="primary"
                onClick=onSave
            }}}
            {{{ Button
                label="отменить"
                type="link"
                onClick=onClose
            }}}
        </div>
    </form>
{{/Modal}}`;
  }
}

export const withStoreDialogCreateChat = connect((state) => ({ isOpenDialogChat: state.isOpenDialogChat }))(DialogCreateChat);

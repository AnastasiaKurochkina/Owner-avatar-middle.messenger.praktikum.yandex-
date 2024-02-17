import Block from '../../core/Block';
import { deleteChat } from '../../services/chat';
import { connect } from '../../utils/connect';

type IMessageHeaderProps = {
  name: string,
  openAddUserModal: () => void;
  addUser: () => void,
  isOpenAddUser: boolean,
  isModalAddUser: boolean,
  chatId: number,
  avatar?: string,
  deleteUser: () => void,
  deleteChat: () => void,
}

export class MessageHeader extends Block<IMessageHeaderProps> {
  constructor(props: IMessageHeaderProps) {
    super({
      ...props,
      openAddUserModal: () => {
        window.store.set({ isOpenAddUser: !this.props.isOpenAddUser });
      },
      addUser: () => {
        window.store.set({ isModalAddUser: true });
      },
      deleteUser: () => {
        window.store.set({ isModalDeleteUser: true });
      },
      deleteChat: () => {
        deleteChat({
          chatId: this.props.chatId,
        });
      },
    });
  }

  protected render(): string {
    const { name, chatId } = this.props;
    return `<div class="messages-header">
    <div class="user-info">
    {{{ChatAvatar chatId=${chatId} img=avatar }}}
      <span class="user-info__name">${name}</span>
    </div>
    <div class="navigation">
      {{{ Button
        label="Удалить чат"
        type="second"
        className="danger"
        onClick=deleteChat
      }}}
     {{{OptionIcon onClick=openAddUserModal}}}
     {{#if isOpenAddUser}} 
      {{#> Tooltip style="top:20px; right:0"}}
      {{{ChatOption src="assets/plus.jpg" label="Добавить пользователя" onClick=addUser}}}
      {{{ChatOption src="assets/minus.jpg" label="Удалить пользователя" onClick=deleteUser}}}
      {{/Tooltip}}
      {{/if}} 
    </div>
  
  </div>`;
  }
}
export default connect(({ isOpenAddUser, isModalAddUser }) => ({ isOpenAddUser, isModalAddUser }))(MessageHeader);

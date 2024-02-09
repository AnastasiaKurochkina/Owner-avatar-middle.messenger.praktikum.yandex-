import Block from '../../core/Block';
import template from './messages.hbs?raw';
import * as validators from '../../utils/validator';
import { ChatCard, InputField, MessageField } from '../../components';
import {
  ActiveChat, Chat, Message, User,
} from '../../type';
import { DialogCreateChat } from '../../components/dialog-create-chat';
import { logout } from '../../services/auth';
import { connect } from '../../utils/connect';
import {
  addUser,
  createChat,
  createWsChat,
  deleteUser,
} from '../../services/chat';
import Router, { PAGES } from '../../core/Router';
import { initChatPage } from '../../services/initApp';

interface IMessapePageProps {
  validate: { [key: string]: Function };
  onSend: () => void;
  logout: () => void;
  openDialog: () => void;
  closeDialog: () => void;
  onSave: () => void;
  goProfile: () => void;
  setActiveChat: (id: number, name: string) => void;
  onCloseModalAddUser: () => void;
  onCloseModalDeleteUser: () => void;
  addUser: () => void;
  deleteUser: () => void;
  chats: Chat[];
  user: User;
  currentChat: ActiveChat;
  isModalDeleteUser: boolean;
  messages: Message[];
}
type Ref = {
  message: MessageField;
  createChat: DialogCreateChat;
  chat: ChatCard;
  userId: InputField;
  userIdDel: InputField;
};

export class MessagesPage extends Block<IMessapePageProps, Ref> {
  constructor(props: IMessapePageProps) {
    super({
      ...props,
      validate: {
        message: validators.message,
      },
      onSend: () => {
        const message = this.refs.message.value();
        const error = validators.message(message);
        if (error) {
          return;
        }
        console.log({
          message,
        });
      },
      logout: () => {
        logout();
      },
      openDialog: () => {
        window.store.set({ isOpenDialogChat: true });
      },
      closeDialog: () => {
        window.store.set({ isOpenDialogChat: false });
      },
      onSave: () => {
        const chatTitle = this.refs.createChat.getChatTitle();
        if (!chatTitle) {
          this.refs.createChat.setError(
            'Название переписки не может быть пустым',
          );
          return;
        }
        createChat(chatTitle)
          .then(() => window.store.set({ isOpenDialogChat: false }))
          .catch((error) => this.refs.createChat.setError(error));
      },
      goProfile: () => {
        Router.go(PAGES.profile);
      },
      setActiveChat: (id: number, name: string) => {
        createWsChat(id, this.props.user);
        window.store.set({
          currentChat: {
            id,
            name,
          },
        });
      },
      onCloseModalAddUser: () => {
        window.store.set({ isModalAddUser: false });
      },
      onCloseModalDeleteUser: () => {
        window.store.set({ isModalDeleteUser: false });
      },
      addUser: () => {
        const userId = Number(this.refs.userId.value());
        addUser({
          users: [userId],
          chatId: this.props.currentChat.id,
        })
          .then(() => {
            console.log('Пользователь добавлен');
            window.store.set({ isModalAddUser: false });
          })
          .catch((error) => console.log(`${error}`));
      },
      deleteUser: () => {
        const userId = Number(this.refs.userIdDel.value());
        deleteUser({
          users: [userId],
          chatId: this.props.currentChat.id,
        })
          .then(() => {
            window.store.set({ isModalDeleteUser: false });
            console.log('Пользователь удален');
          })
          .catch((error) => console.log(`${error}`));
      },
    });
    initChatPage();
  }

  protected render(): string {
    return template;
  }
}

export default connect(
  ({
    chats,
    user,
    currentChat,
    isOpenAddUser,
    isModalAddUser,
    isModalDeleteUser,
    messages,
  }) => ({
    chats,
    user,
    currentChat,
    isOpenAddUser,
    isModalAddUser,
    isModalDeleteUser,
    messages,
  }),
)(MessagesPage);

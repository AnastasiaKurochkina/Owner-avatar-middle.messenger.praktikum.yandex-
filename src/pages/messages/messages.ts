import Block from "../../core/Block";
import template from "./messages.hbs?raw";
import { messagesProps } from "../../const";
import * as validators from "../../utils/validator";
import { MessageField } from "../../components";
import { Chat } from "../../type";
import { DialogCreateChat } from "../../components/dialog-create-chat";
import { logout } from "../../services/auth";
import { connect } from "../../utils/connect";
import { createChat } from "../../services/chat";

interface IMessapePageProps {
  // chatList: {
  //   name: string;
  //   message: string;
  //   time: string;
  //   isYourMessage?: boolean;
  //   count?: number;
  // }[];
  // currentChat: {
  //   text?: string;
  //   type: "outcoming" | "incoming";
  //   time: string;
  //   checked?: boolean;
  //   img?: string;
  // }[];
  validate: { [key: string]: Function };
  // onSend: () => void;
  logout: () => void;
  openDialog: () => void;
  closeDialog: () => void;
  onSave: () => void;
  chats: Chat[];
}
type Ref = {
  message: MessageField;
  createChat: DialogCreateChat;
};

export class MessagesPage extends Block<IMessapePageProps, Ref> {

  constructor(props: IMessapePageProps) {
    super({
      ...props,
      // chatList: messagesProps.messages,
      // currentChat: messagesProps.message,
      validate: {
        message: validators.message,
      },
      // onSend: () => {
      //   const message = this.refs.message.value();
      //   const error = validators.message(message);
      //   if (error) {
      //     return;
      //   }

      //   console.log({
      //     message,
      //   });
      // },
      logout,
      openDialog: () => {
        window.store.set({ isOpenDialogChat: true });
        console.log(" window.store", window.store);
      },
      closeDialog: () => {
        console.log("closeDialog");
        window.store.set({ isOpenDialogChat: false });
        console.log("window.store", window.store);
      },
      onSave: () => {
        console.log("onSave");
        const chatTitle = this.refs.createChat.getChatTitle();
        if (!chatTitle) {
          this.refs.createChat.setError(
            "Название переписки не может быть пустым"
          );
          return;
        }
        createChat(chatTitle)
          .then(() => window.store.set({ isOpenDialogChat: false }))
          .catch((error) => this.refs.createChat.setError(error));
      },
    });
    console.log('props',this.props)
  }

  protected render(): string {
    return template;
  }
}

export default connect(({ chats, user }) => ({ chats, user }))(MessagesPage);

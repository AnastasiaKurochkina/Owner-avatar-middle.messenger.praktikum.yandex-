export type AppState = {
    error: string | null,
    user: User | null,
    isOpenDialogChat: boolean,
    chats: Chat[],
    currentChat: ActiveChat | null,
    isOpenAddUser: boolean,
    isModalAddUser: boolean,
    isModalDeleteUser: boolean,
    messages: Message[],
}
export type ActiveChat = {
  id: number,
  name: string,
  avatar?: string | null
}

export type Message = {
    chat_id: number,
    content: string,
    file: null,
    id: number,
    is_read: boolean,
    time: string,
    type: string,
    user_id: number
}

export type User = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type Password = {
  oldPassword: string;
  newPassword: string;
};

type LastMessage = {
    user: User,
    time: string,
    content: string
}

export type Chat = {
    id: number,
    title: string,
    avatar: Nullable<string>,
    unread_сount: number,
    last_message: LastMessage | null
}

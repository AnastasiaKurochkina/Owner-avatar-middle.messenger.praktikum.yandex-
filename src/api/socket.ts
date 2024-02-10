import { getChatToken } from '../services/chat';
import { User } from '../type';

export const createWebSocket = async (chatid: number, user: User) => {
  const resp = await getChatToken(chatid);
  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatid}/${resp.token}`,
  );
  const ping = () => socket.send(JSON.stringify({ type: 'ping' }));

  let pingIntervalId = 0;

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
    socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
    pingIntervalId = setInterval(ping, 5000);
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
    clearInterval(pingIntervalId);
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    console.log('Получены данные', event.data);
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'pong' || data.type === 'user connected') {
        return;
      }
      const state = window.store.getState();
      if (Array.isArray(data)) {
        window.store.set({
          messages: [...data.reverse()],
        });
      } else {
        window.store.set({
          messages: [...state.messages, data],
        });
      }
    } catch (error) {
      console.log('Ошибка при парсере JSON', error);
    }
    const sendBtn = document.getElementById('send-message');
    sendBtn?.addEventListener('click', () => {
      const input: HTMLInputElement = document.getElementById(
        'message-field',
      ) as HTMLInputElement;
      if (input.value) {
        socket.send(
          JSON.stringify({
            content: input.value,
            type: 'message',
          }),
        );
      }
    });
  });

  socket.addEventListener('error', (event) => {
    console.log('Ошибка', event);
  });
};

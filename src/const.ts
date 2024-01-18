export const messagesProps: {
  messages: {
    name: string,
    message: string,
    time: string,
    isYourMessage?: boolean, count?: number
  }[],
  message: {
    text?: string,
    type: 'outcoming' | 'incoming',
    time: string,
    checked?: boolean,
    img?: string
  }[]
} = {
  messages: [
    {
      name: 'Андрей',
      message: 'Изображение',
      time: '10:49',
      count: 2,
    },
    {
      name: 'Киноклуб',
      message: 'стикер',
      time: '12:00',
      isYourMessage: true,
    },
    {
      name: 'Илья',
      message:
        'Друзья, у меня для вас особенных выпуск новостей! Очень интересная информация',
      time: '15:12',
      count: 4,
    },
    {
      name: 'Вадим',
      message: ' Какой-то текст сообщения',
      time: 'Пт',
      isYourMessage: true,
    },
    {
      name: 'тет-а-теты',
      message:
        'И Human Interface Guidelines и Matererial Design рекомендуют использовать',
      time: 'Ср',
    },
    {
      name: '1,2,3',
      message:
        'Миллионы россиян ежедневно проводят десятки часов своего времени',
      time: 'Пн',
    },
    {
      name: 'Design Destroyer',
      message: 'В 2008 году художник Jon Rafman начать собирать свои картины',
      time: 'Пн',
    },
    {
      name: 'Day',
      message:
        'Так увлекся работой по курсы, что совсем забыл анонсировать предложение',
      time: '1 Мая 2020',
    },
    {
      name: 'Стас Рогозин',
      message: 'Можно сегодня или завтра оптравить преокт на проверку?',
      time: '12 Апр 2020',
    },
  ],

  message: [
    {
      text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
      type: 'incoming',
      time: '11:56',
    },
    {
      img: 'assets/camera.png',
      type: 'incoming',
      time: '11:56',
    },
    {
      text: 'Круто!',
      type: 'outcoming',
      time: '11:56',
      checked: true,
    },
  ],
};

export const profileProps: {
  label: string,
  value: string,
  type: string,
  name: string,
}[] = [
  {
    label: 'Почта',
    value: 'pochta@yandex.ru',
    type: 'text',
    name: 'email',
  },
  {
    label: 'Логин',
    value: 'pochta@yandex.ru',
    type: 'text',
    name: 'login',
  },
  {
    label: 'Имя',
    value: 'Иван',
    type: 'text',
    name: 'first_name',
  },
  {
    label: 'Фамилия',
    value: 'Иванов',
    type: 'text',
    name: 'second_name',
  },
  {
    label: 'Имя в чате',
    value: 'ivanivanov',
    type: 'text',
    name: 'display_name',
  },
  {
    label: 'Телефон',
    value: '89099673030',
    type: 'text',
    name: 'phone',
  },
];

export const profilePropsEditPassword: {
  label: string,
  value: string,
  type: string,
  name: string,
}[] = [
  {
    label: 'Старый пароль',
    value: 'старый пароль',
    type: 'password',
    name: 'oldPassword',
  },
  {
    label: 'Новый пароль',
    value: 'новый пароль',
    type: 'password',
    name: 'newPassword',
  },
  {
    label: 'Повторите новый пароль',
    value: 'новый пароль',
    type: 'password',
    name: 'newPasswordRepeat',
  },
];

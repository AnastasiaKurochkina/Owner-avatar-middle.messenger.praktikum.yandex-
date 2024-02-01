import Block from '../../core/Block';
import { navigate } from '../../core/navigate';

export class AllPages extends Block<{}> {
  constructor() {
    super({
      onSignin: () => {
        navigate('signin');
      },
      onLogin: () => {
        navigate('login');
      },
      onProfile: () => {
        navigate('profile');
      },
      onMessages: () => {
        navigate('messages');
      },
      onServerError: () => {
        navigate('serverError');
      },
      onNotFound: () => {
        navigate('notFound');
      },
    });
  }

  protected render(): string {
    return `<nav>
      <div class="pages-container">
        {{{Button class="pages-link" label="login" type="primary" type=text onClick=this.onLogin}}}
        {{{Button class="pages-link" label="signin" type="primary" type=text onClick=this.onSignin}}}
        {{{Button class="pages-link"label="profile" type="primary" type=text onClick=this.onProfile}}}
        {{{Button class="pages-link" label="messages" type="primary" type=text onClick=this.onMessages}}}
        {{{Button class="pages-link" label="not-found" type="primary" type=text onClick=this.onNotFound}}}
        {{{Button class="pages-link" label="server-error" type="primary" type=text onClick=this.onServerError}}}
      </div>
    </nav>`;
  }
}

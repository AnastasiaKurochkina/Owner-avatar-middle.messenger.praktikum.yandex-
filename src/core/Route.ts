/* eslint-disable no-shadow */

export enum PAGES {
  login = '/',
  signin = '/sign-up',
  messeges = '/messenger',
  profile = '/profile',
  profile_edit = '/settings',
  profile_password_edit = '/settings-password',
  not_found = '/not-found',
  server_error = '/server-error',
}

function render(query: string, block: any) {
  const app = document.querySelector(query);
  app?.replaceChildren(block.getContent()!);
}
class Route {
  private _pathname: string;

  private _blockClass: any; // не смогла понять как правильно типизировать

  private _block: null | any; // не смогла понять как правильно типизировать

  private _props: {
    rootQuery: string;
  };

  constructor(pathname: string, view: any, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: String) {
    return pathname === this._pathname;
  }

  render(route?: Route, pathname?: string) {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
  }
}

export default Route;

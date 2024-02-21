/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import Route from "./Route";
import Block from "./Block";
import sinon from 'sinon';
interface Props {}
describe('Route', () => {
  let route: Route;
  const PAGES = {
    login: '/',
    messages: '/messenger',
    profile: '/profile',
  };
  let PageClass: typeof Block<Props>;
  beforeEach(() => {
    class Page extends Block<Props> {
      constructor(props: Props) {
        super({
          ...props,
        });
      }

      protected render(): string {
        return `<div class="my-component">
                </div>`;
      }
    }

    PageClass = Page;
    route = new Route(PAGES.login, PageClass, { rootQuery: '#app' });
  });

  it('Сравнение роутов', () => {
    expect(route.match(PAGES.login)).to.be.true;
  });

  it('Скрытие роута', () => {
    route.navigate(PAGES.profile);
    route.leave();
    const app = document.querySelector('#app');
    const myComponent = app?.querySelector('.my-component');
    expect(myComponent).to.be.null; 
});

  it('Отрисовка компонента', () => {
    const renderSpy = sinon.spy(route, 'render');
    route.render();
    expect(renderSpy.calledOnce).to.be.true;
  });



});

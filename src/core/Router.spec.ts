/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import sinon from 'sinon';
import Router from "./Router";
import Block from "./Block";
import Route from "./Route";
describe('Router', () => {
  let router: Router;
  beforeEach(() => {
    router = new Router("#app");
  });

  it('Добавление маршрутов', () => {
    router.use("/test", Block);
    const route = router.getRoute("/test");
    expect(route)
      .to
      .be
      .instanceOf(Route);
  });

  it('Инициализация роутера', () => {
    const spyRouter = sinon.spy(router, 'start');
    router.start();
    expect(spyRouter.called).to.be.true;
});

  it('Получить роутер', () => {
    router.use("/test", Block);
    const route = router.getRoute("/test");
    expect(route)
      .to
      .be
      .instanceOf(Route);
  });

  it('Перейти по роутеру', () => {
    const spyRouter = sinon.spy(router, 'go');
    router.go('/new-test')
    expect(spyRouter.calledWithMatch('/new-test')).to.be.true;
  });

  it('Вернуться на предыдущий роут', () => {
    const spyRouter = sinon.spy(router, 'back');
    router.back();
    expect(spyRouter.calledOnce).to.be.true;
  });



});

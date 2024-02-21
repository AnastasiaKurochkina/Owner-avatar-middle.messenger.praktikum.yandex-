/* eslint-disable no-unused-expressions */
import sinon from "sinon";
import { HTTPTransport, METHOD } from "./httpTransport";
import { expect } from "chai";

describe("HttpTransport", () => {
  let http: HTTPTransport;
  const host = "https://ya-praktikum.tech/api/v2";

  beforeEach(() => {
    http = new HTTPTransport("/test");
  });

  it("Метод GET", async () => {
    const requestStub = sinon.stub(http, "request").resolves();

    await http.get("", { data: { key1: "1", key2: "2" } });

    const expectedUrl = `${host}/test?key1=1&key2=2`;

    expect(requestStub.calledWithMatch(expectedUrl, { method: METHOD.GET })).to
      .be.true;
  });

  it("Метод POST", async () => {
    const requestStub = sinon.stub(http, "request").resolves();
    const dataPost = { a: "1", b: "2 2" };

    await http.post("", { data: dataPost });

    const expectedUrl = `${host}/test`;
    expect(
      requestStub.calledWithMatch(expectedUrl, {
        method: METHOD.POST,
        data: dataPost,
      })
    ).to.be.true;
  });

  it("Метод PUT", async () => {
    const requestStub = sinon.stub(http, "request").resolves();
    const dataPost = { a: "1", b: "2 2" };

    await http.put("", { data: dataPost });

    const expectedUrl = `${host}/test`;
    expect(
      requestStub.calledWithMatch(expectedUrl, {
        method: METHOD.PUT,
        data: dataPost,
      })
    ).to.be.true;
  });

  it("Метод DELETE", async () => {
    const requestStub = sinon.stub(http, "request").resolves();
    const dataPost = { a: "1", b: "2 2" };

    await http.delete("", { data: dataPost });

    const expectedUrl = `${host}/test`;

    expect(
      requestStub.calledWithMatch(expectedUrl, {
        method: METHOD.DELETE,
        data: dataPost,
      })
    ).to.be.true;
  });
});

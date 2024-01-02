import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

import {messages_props, profile_props, profile_props_edit_password} from "./const.ts";

const pages = {
  login: [Pages.LoginPage, { title: "Вход" }],
  signin: [Pages.SigninPage, { title: "Регистрация" }],
  messages: [Pages.MessagePage, { messages: messages_props }],
  profile: [Pages.ProfilePage, {profileInfo: profile_props}],
  notFound: [Pages.NotFound],
  serverError: [Pages.ServerError]
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("login"));

document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

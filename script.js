import { Pong } from "./app/models/Pong.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pong");
  const pong = new Pong(canvas);

  window.addEventListener("load", () => {
    pong.init();
    pong.start();
  });
});

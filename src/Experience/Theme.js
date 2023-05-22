import { EventEmitter } from "events";

export default class Theme extends EventEmitter {
  constructor() {
    super();

    this.theme = "light";

    this.toggleButton = document.querySelector(".toggle-button");
    this.toggleCircle1 = document.querySelector(".toggle-circle-1");

    this.toggleMenu = document.querySelector(".toggle-menu");
    this.toggleCircle2 = document.querySelector(".toggle-circle-2");

    this.setEventListeners();
    this.setMenu();
  }

  setEventListeners() {
    this.toggleButton.addEventListener("click", () => {
      this.toggleCircle1.classList.toggle("slide");
      this.theme = this.theme === "light" ? "dark" : "light";
      this.uNightMixValue = this.theme === "light" ? 0 : 1;
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");
      // console.log(this.theme);

      this.emit("switch", this.theme, this.uNightMixValue);
    });
  }

  setMenu() {
    this.toggleMenu.addEventListener("click", () => {
      this.toggleCircle2.classList.toggle("slide");
      this.emit("togglemenu");
    });
  }
}

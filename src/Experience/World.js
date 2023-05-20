import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "./Experience.js";
import Baked from "./Baked.js";
import GoogleLeds from "./GoogleLeds.js";
import LoupedeckButtons from "./LoupedeckButtons.js";
import CoffeeSteam from "./CoffeeSteam.js";
import TopChair from "./TopChair.js";
import ElgatoLight from "./ElgatoLight.js";
import BouncingLogo from "./BouncingLogo.js";
import Screen from "./Screen.js";

export default class World extends EventEmitter {
  constructor(_options) {
    super();

    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.baked = null;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setBaked();
        this.setGoogleLeds();
        this.setLoupedeckButtons();
        this.setCoffeeSteam();
        this.setTopChair();
        this.setElgatoLight();
        this.setBouncingLogo();
        this.setScreens();
        this.emit("worldready");
      }
    });
  }

  setBaked() {
    this.baked = new Baked();
    // this.baked.scaleModel();
  }

  setGoogleLeds() {
    this.googleLeds = new GoogleLeds();
  }

  setLoupedeckButtons() {
    this.loupedeckButtons = new LoupedeckButtons();
  }

  setCoffeeSteam() {
    this.coffeeSteam = new CoffeeSteam();
  }

  setTopChair() {
    this.topChair = new TopChair();
  }

  setElgatoLight() {
    this.elgatoLight = new ElgatoLight();
  }

  setBouncingLogo() {
    this.bouncingLogo = new BouncingLogo();
  }

  setScreens() {
    this.pcScreen = new Screen(
      this.resources.items.pcScreenModel.scene.children[0],
      "/assets/videoPortfolio.mp4"
    );
    this.macScreen = new Screen(
      this.resources.items.macScreenModel.scene.children[0],
      "/assets/videoStream.mp4"
    );
  }

  // getCombinedModel() {
  //   const combinedModel = new THREE.Group();

  //   if (this.topChair) {
  //     combinedModel.add(this.topChair.getModel());
  //     // console.log("success");
  //   }

  //   // if (this.googleLeds) {
  //   //   combinedModel.add(this.googleLeds.getModel());
  //   // }

  //   // if (this.loupedeckButtons) {
  //   //   combinedModel.add(this.loupedeckButtons.getModel());
  //   // }
  //   // console.log(combinedModel);

  //   return combinedModel;
  // }

  resize() {}

  update() {
    if (this.googleLeds) this.googleLeds.update();

    if (this.loupedeckButtons) this.loupedeckButtons.update();

    if (this.coffeeSteam) this.coffeeSteam.update();

    if (this.topChair) this.topChair.update();

    if (this.bouncingLogo) this.bouncingLogo.update();
  }

  destroy() {}
}

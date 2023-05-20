import * as THREE from "three";
import { EventEmitter } from "events";
import GSAP from "gsap";
import Experience from "./Experience.js";
import Baked from "./Baked.js";
import GoogleLeds from "./GoogleLeds.js";
import LoupedeckButtons from "./LoupedeckButtons.js";
import CoffeeSteam from "./CoffeeSteam.js";
import TopChair from "./TopChair.js";
import ElgatoLight from "./ElgatoLight.js";
import BouncingLogo from "./BouncingLogo.js";
import Screen from "./Screen.js";
import Floor from "./Floor.js";

export default class World extends EventEmitter {
  constructor(_options) {
    super();

    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // declare group of models
    this.group = new THREE.Group();

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

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

        this.floor = new Floor();

        this.setModel();
        this.setAnimation();
        this.onMouseMove();

        this.emit("worldready");
      }
    });
  }

  setModel() {
    // Add models to group
    this.group.add(this.baked.model.mesh);
    this.group.add(this.topChair.model.group);
    this.group.add(this.elgatoLight.model.mesh);

    this.group.add(this.floor.plane);

    this.group.add(this.floor.circleFirst);
    this.group.add(this.floor.circleSecond);
    this.group.add(this.floor.circleThird);

    this.googleLeds.model.items.forEach((item) => this.group.add(item.mesh));
    this.loupedeckButtons.model.items.forEach((item) =>
      this.group.add(item.mesh)
    );

    this.group.add(this.bouncingLogo.model.group);
    this.group.add(this.coffeeSteam.model.mesh);
    this.group.add(this.pcScreen.model.mesh);
    this.group.add(this.macScreen.model.mesh);

    this.group.scale.set(0.5, 0.5, 0.5);
    this.scene.add(this.group);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.group);
    // this.swim = this.mixer.clipAction(this.room.animations[0]);
    // this.swim.play();
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.05;
    });
  }

  setBaked() {
    this.baked = new Baked();
    this.room = this.baked.model.mesh;
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

  resize() {}

  update() {
    // make model move when hover
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.group.rotation.y = this.lerp.current;

    if (this.mixer) this.mixer.update(this.time.delta * 0.0009);

    if (this.googleLeds) this.googleLeds.update();

    if (this.loupedeckButtons) this.loupedeckButtons.update();

    if (this.coffeeSteam) this.coffeeSteam.update();

    if (this.topChair) this.topChair.update();

    if (this.bouncingLogo) this.bouncingLogo.update();
  }

  destroy() {}
}

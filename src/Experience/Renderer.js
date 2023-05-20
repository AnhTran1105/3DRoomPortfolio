// import * as THREE from "three";
// import Experience from "./Experience.js";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

// export default class Renderer {
//   constructor(_options = {}) {
//     this.experience = new Experience();
//     this.config = this.experience.config;
//     this.debug = this.experience.debug;
//     this.stats = this.experience.stats;
//     this.time = this.experience.time;
//     this.sizes = this.experience.sizes;
//     this.scene = this.experience.scene;
//     this.camera = this.experience.camera;

//     this.usePostprocess = false;

//     this.setInstance();
//     this.setPostProcess();
//   }

//   setInstance() {
//     this.clearColor = new THREE.Color(0xffffff);

//     // Renderer
//     this.instance = new THREE.WebGLRenderer({
//       alpha: false,
//       antialias: true,
//     });
//     this.instance.domElement.style.position = "absolute";
//     this.instance.domElement.style.top = 0;
//     this.instance.domElement.style.left = 0;
//     this.instance.domElement.style.width = "100%";
//     this.instance.domElement.style.height = "100%";

//     // this.instance.setClearColor(0x414141, 1)
//     this.instance.setClearColor(this.clearColor, 1);
//     this.instance.setSize(this.config.width, this.config.height);
//     this.instance.setPixelRatio(this.config.pixelRatio);

//     // this.instance.physicallyCorrectLights = true
//     // this.instance.gammaOutPut = true
//     this.instance.outputEncoding = THREE.sRGBEncoding;
//     // this.instance.shadowMap.type = THREE.PCFSoftShadowMap
//     // this.instance.shadowMap.enabled = false
//     // this.instance.toneMapping = THREE.ReinhardToneMapping
//     // this.instance.toneMappingExposure = 1.3

//     this.context = this.instance.getContext();

//     // Add stats panel
//     if (this.stats) {
//       this.stats.setRenderPanel(this.context);
//     }
//   }

//   setPostProcess() {
//     this.postProcess = {};

//     /**
//      * Render pass
//      */
//     this.postProcess.renderPass = new RenderPass(
//       this.scene,
//       this.camera.instance
//     );

//     /**
//      * Effect composer
//      */
//     const RenderTargetClass =
//       this.config.pixelRatio >= 2
//         ? THREE.WebGLRenderTarget
//         : THREE.WebGLMultisampleRenderTarget;
//     // const RenderTargetClass = THREE.WebGLRenderTarget
//     this.renderTarget = new RenderTargetClass(
//       this.config.width,
//       this.config.height,
//       {
//         generateMipmaps: false,
//         minFilter: THREE.LinearFilter,
//         magFilter: THREE.LinearFilter,
//         format: THREE.RGBFormat,
//         encoding: THREE.sRGBEncoding,
//       }
//     );
//     this.postProcess.composer = new EffectComposer(
//       this.instance,
//       this.renderTarget
//     );
//     this.postProcess.composer.setSize(this.config.width, this.config.height);
//     this.postProcess.composer.setPixelRatio(this.config.pixelRatio);

//     this.postProcess.composer.addPass(this.postProcess.renderPass);
//   }

//   resize() {
//     // Instance
//     this.instance.setSize(this.config.width, this.config.height);
//     this.instance.setPixelRatio(this.config.pixelRatio);

//     // Post process
//     this.postProcess.composer.setSize(this.config.width, this.config.height);
//     this.postProcess.composer.setPixelRatio(this.config.pixelRatio);
//   }

//   update() {
//     if (this.stats) {
//       this.stats.beforeRender();
//     }

//     if (this.usePostprocess) {
//       this.postProcess.composer.render();
//     } else {
//       this.instance.render(this.scene, this.camera.instance);
//     }

//     if (this.stats) {
//       this.stats.afterRender();
//     }
//   }

//   destroy() {
//     this.instance.renderLists.dispose();
//     this.instance.dispose();
//     this.renderTarget.dispose();
//     this.postProcess.composer.renderTarget1.dispose();
//     this.postProcess.composer.renderTarget2.dispose();
//   }
// }

import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    // this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
    this.renderer.render(this.scene, this.camera.orthographicCamera);
    // Second Screen
    // this.renderer.setScissorTest(true);
    // this.renderer.setViewport(
    //     this.sizes.width - this.sizes.width / 3,
    //     this.sizes.height - this.sizes.height / 3,
    //     this.sizes.width / 3,
    //     this.sizes.height / 3
    // );

    // this.renderer.setScissor(
    //     this.sizes.width - this.sizes.width / 3,
    //     this.sizes.height - this.sizes.height / 3,
    //     this.sizes.width / 3,
    //     this.sizes.height / 3
    // );

    // this.renderer.render(this.scene, this.camera.perspectiveCamera);

    // this.renderer.setScissorTest(false);
  }
}

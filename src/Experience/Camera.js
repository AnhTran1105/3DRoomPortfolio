// import * as THREE from 'three'
// import Experience from './Experience.js'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// export default class Camera
// {
//     constructor(_options)
//     {
//         // Options
//         this.experience = new Experience()
//         this.config = this.experience.config
//         this.debug = this.experience.debug
//         this.time = this.experience.time
//         this.sizes = this.experience.sizes

//         this.targetElement = this.experience.targetElement

//         this.scene = this.experience.scene

//         // Set up
//         this.mode = 'default' // default \ debug

//         this.setInstance()
//         this.setModes()
//     }

//     setInstance()
//     {
//         // Set up
//         this.instance = new THREE.PerspectiveCamera(20, this.config.width / this.config.height, 0.1, 150)
//         this.instance.rotation.reorder('YXZ')

//         this.scene.add(this.instance)
//     }

//     setModes()
//     {
//         this.modes = {}

//         // Default
//         this.modes.default = {}
//         this.modes.default.instance = this.instance.clone()
//         this.modes.default.instance.rotation.reorder('YXZ')

//         // Debug
//         this.modes.debug = {}
//         this.modes.debug.instance = this.instance.clone()
//         this.modes.debug.instance.rotation.reorder('YXZ')
//         this.modes.debug.instance.position.set(- 15, 15, 15)

//         this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
//         this.modes.debug.orbitControls.enabled = false
//         this.modes.debug.orbitControls.screenSpacePanning = true
//         this.modes.debug.orbitControls.enableKeys = false
//         this.modes.debug.orbitControls.zoomSpeed = 0.25
//         this.modes.debug.orbitControls.enableDamping = true
//         this.modes.debug.orbitControls.update()
//     }

//     resize()
//     {
//         this.instance.aspect = this.config.width / this.config.height
//         this.instance.updateProjectionMatrix()

//         this.modes.default.instance.aspect = this.config.width / this.config.height
//         this.modes.default.instance.updateProjectionMatrix()

//         this.modes.debug.instance.aspect = this.config.width / this.config.height
//         this.modes.debug.instance.updateProjectionMatrix()
//     }

//     update()
//     {
//         // Update debug orbit controls
//         this.modes.debug.orbitControls.update()

//         // Apply coordinates
//         this.instance.position.copy(this.modes[this.mode].instance.position)
//         this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
//         this.instance.updateMatrixWorld() // To be used in projection
//     }

//     destroy()
//     {
//         this.modes.debug.orbitControls.destroy()
//     }
// }

import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 29;
    this.perspectiveCamera.position.y = 14;
    this.perspectiveCamera.position.z = 12;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    // 6.5
    this.orthographicCamera.position.y = 5.65;
    this.orthographicCamera.position.z = 9.5;
    // this.orthographicCamera.position.x = -3;
    this.orthographicCamera.rotation.x = -Math.PI / 6;

    this.scene.add(this.orthographicCamera);

    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    const size = 20;
    const divisions = 20;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
  }

  resize() {
    // Updating Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    // console.log(this.perspectiveCamera.position);
    this.controls.update();

    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}

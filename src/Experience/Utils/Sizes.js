// import EventEmitter from './EventEmitter.js'

// export default class Sizes extends EventEmitter
// {
//     /**
//      * Constructor
//      */
//     constructor()
//     {
//         super()

//         // Viewport size
//         this.viewport = {}
//         this.$sizeViewport = document.createElement('div')
//         this.$sizeViewport.style.width = '100vw'
//         this.$sizeViewport.style.height = '100vh'
//         this.$sizeViewport.style.position = 'absolute'
//         this.$sizeViewport.style.top = 0
//         this.$sizeViewport.style.left = 0
//         this.$sizeViewport.style.pointerEvents = 'none'

//         // Resize event
//         this.resize = this.resize.bind(this)
//         window.addEventListener('resize', this.resize)

//         this.resize()
//     }

//     /**
//      * Resize
//      */
//     resize()
//     {
//         document.body.appendChild(this.$sizeViewport)
//         this.viewport.width = this.$sizeViewport.offsetWidth
//         this.viewport.height = this.$sizeViewport.offsetHeight
//         document.body.removeChild(this.$sizeViewport)

//         this.width = window.innerWidth
//         this.height = window.innerHeight

//         this.trigger('resize')
//     }
// }

import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.frustrum = 5;
    if (this.width < 968) {
      this.device = "mobile";
    } else {
      this.device = "desktop";
    }

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");

      if (this.width < 968 && this.device !== "mobile") {
        this.device = "mobile";
        this.emit("switchdevice", this.device);
      } else if (this.width >= 968 && this.device !== "desktop") {
        this.device = "desktop";
        this.emit("switchdevice", this.device);
      }
    });
  }
}

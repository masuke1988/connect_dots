// import { gl } from '../core/WebGL'
import { Camera, WebGLRenderer } from 'three'
import { OrbitControls as OC } from 'three/examples/jsm/controls/OrbitControls.js'

export class OrbitControls {
  private controls: OC
  // camera: any
  // renderer: any
  
  constructor(camera: Camera, renderer: WebGLRenderer) {
    // this.controls = new OC(gl.camera, gl.renderer.domElement)
    this.controls = new OC(camera, renderer.domElement)
    console.log(this.controls)
    // this.controls.enableDamping = true
    // this.controls.dampingFactor = 0.1
    // this.controls.enableZoom = true
  }

  /**
   * ダンピング（慣性）を無効化
   */
  disableDamping() {
    this.controls.enableDamping = false
  }

  /**
   * ズームを無効化
   */
  disableZoom() {
    this.controls.enableZoom = false
  }

  /**
   * アップデート
   */
  update() { 
    this.controls.update()
  }
}

// export const controls = new OrbitControls()
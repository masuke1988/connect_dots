import { Clock } from 'three/webgpu'
import { gl } from './core/WebGL'
import { boxMeshHelper } from './utils/boxMeshHelper';
import { connectDotMesh } from './mesh/connectDotMesh';
import { OrbitControls as OC } from 'three/examples/jsm/controls/OrbitControls.js'


export class App {
  controls: OC
  mesh: ReturnType<typeof connectDotMesh>['pointCloud']
  clock: Clock

  constructor() {
    gl.init()
    this.controls = new OC(gl.camera, gl.renderer.domElement)
    this.mesh = connectDotMesh().pointCloud
    this.clock = new Clock()
    gl.scene.add(this.mesh)

    this._orbitControls()
    this._helper()
    this._init()

  }

  _init() {
    this._animate()
  }

  private _orbitControls() { 
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.1
    this.controls.enableZoom = true
  }

  private _helper() {
    const helper = boxMeshHelper()
    gl.scene.add(helper)
  }

  _update() {
    const delta = this.clock.getDelta()
    const posArr = this.mesh.geometry.attributes.position.array as Float32Array
    const velArr = this.mesh.geometry.attributes.velocity.array as Float32Array

    for (let i = 0; i < posArr.length / 3; i++) {
      const idx = i * 3
      posArr[idx]     += velArr[idx]     * delta
      posArr[idx + 1] += velArr[idx + 1] * delta
      posArr[idx + 2] += velArr[idx + 2] * delta

      // 境界（-1〜1）で速度を反転
      if (posArr[idx]     < -1 || posArr[idx]     > 1) velArr[idx]     *= -1
      if (posArr[idx + 1] < -1 || posArr[idx + 1] > 1) velArr[idx + 1] *= -1
      if (posArr[idx + 2] < -1 || posArr[idx + 2] > 1) velArr[idx + 2] *= -1
    }

    this.mesh.geometry.attributes.position.needsUpdate = true
    this.mesh.geometry.attributes.velocity.needsUpdate = true
  }

  _animate() {
    requestAnimationFrame(() => this._animate())

    this._update()
    this.controls.update()
    gl.renderer.render(gl.scene, gl.camera)
  }

  _resize() {
    const { width, height, aspect } = gl.size;

    gl.camera.aspect = aspect;

    gl.camera.updateProjectionMatrix();
    gl.renderer.setSize(width, height);
  }
}

export const app = new App()

window.addEventListener('resize', () => app._resize())
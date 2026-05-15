import { Clock } from 'three/webgpu'
import { gl } from './core/WebGL'
import { initGUI } from './utils/gui'
import { boxMeshHelper } from './utils/boxMeshHelper';
import { connectDotMesh } from './mesh/connectDotMesh';
import { OrbitControls as OC } from 'three/examples/jsm/controls/OrbitControls.js'


export class App {
  controls: OC
  mesh: ReturnType<typeof connectDotMesh>['pointCloud']
  lineMesh: ReturnType<typeof connectDotMesh>['lineMesh']
  particleCount: ReturnType<typeof connectDotMesh>['particleCount']
  params = { minDistance: 0.1 }
  clock: Clock

  constructor() {
    gl.init()
    this.controls = new OC(gl.camera, gl.renderer.domElement)
    const { pointCloud, lineMesh, particleCount } = connectDotMesh()
    this.mesh = pointCloud
    this.lineMesh = lineMesh
    this.particleCount = particleCount
    this.clock = new Clock()
    gl.scene.add(this.mesh)
    gl.scene.add(this.lineMesh)

    this._orbitControls()
    this._helper()
    this._init()
    initGUI(gl, this.params)
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

  _update(minDistance: number) {
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

    // 線の更新
    const linePos = this.lineMesh.geometry.attributes.position.array as Float32Array
    const lineColor = this.lineMesh.geometry.attributes.color.array as Float32Array

    let numConnected = 0
    let vertexPos = 0
    let colorPos = 0

    for (let i = 0; i < this.particleCount; i++) {
      for (let j = i + 1; j < this.particleCount; j++) {
        const dx = posArr[i * 3]     - posArr[j * 3]
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1]
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist >= minDistance) continue

        const alpha = 1.0 - dist / minDistance

        // 線の始点（パーティクル i）
        linePos[vertexPos++] = posArr[i * 3]
        linePos[vertexPos++] = posArr[i * 3 + 1]
        linePos[vertexPos++] = posArr[i * 3 + 2]

        // 線の終点（パーティクル j）
        linePos[vertexPos++] = posArr[j * 3]
        linePos[vertexPos++] = posArr[j * 3 + 1]
        linePos[vertexPos++] = posArr[j * 3 + 2]

        // 線の色（アルファ値を距離に応じて変化）
        lineColor[colorPos++] = alpha
        lineColor[colorPos++] = 0
        lineColor[colorPos++] = alpha

        // 線の色（アルファ値を距離に応じて変化）
        lineColor[colorPos++] = alpha
        lineColor[colorPos++] = alpha
        lineColor[colorPos++] = 0

        numConnected++
      }
    }

    this.lineMesh.geometry.setDrawRange(0, numConnected * 2)
    this.lineMesh.geometry.attributes.position.needsUpdate = true
    this.lineMesh.geometry.attributes.color.needsUpdate = true
  }

  _animate() {
    requestAnimationFrame(() => this._animate())

    this._update(this.params.minDistance)
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
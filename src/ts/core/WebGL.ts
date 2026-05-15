import { PerspectiveCamera, Scene, AmbientLight, Vector3, Color, WebGPURenderer } from 'three/webgpu'

class WebGL {
  camera: PerspectiveCamera
  scene: Scene
  renderer: WebGPURenderer

  constructor() {
    const { width, height, aspect } = this.size

    // シーン
    this.scene = new Scene()
    this.scene.background = new Color(0x000000)

    // カメラ
    this.camera = new PerspectiveCamera(75, aspect, 0.01, 1000)
    this.camera.position.set(0, 1, 0)
    this.camera.lookAt(new Vector3(0, 0, 0))
    this.camera.updateProjectionMatrix()
    this.scene.add(this.camera)
    
    // レンダラー
    this.renderer = new WebGPURenderer({ antialias: true, alpha: true})
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    
    document.body.appendChild(this.renderer.domElement)
    
    this.init()
  }

  init() {
    this._renderer()
  }

  /**
   * ライトの設定
   */
  private _light() {
    const amlight = new AmbientLight(0xffffff, 2.0);
    amlight.position.set(0, 0, 10)
    this.scene.add(amlight)
  }

  /**
   * レンダラーの設定
   */
  private _renderer() {
    this.renderer.render(this.scene, this.camera)
  }

  /**
   * サイズのゲッター
   */
  get size() { 
    const { innerWidth: width, innerHeight: height } = window
    return { width, height, aspect: width / height }
  }
}

export const gl = new WebGL()

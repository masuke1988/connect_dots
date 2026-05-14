import { Vector2 } from 'three'

class mouse2D {

  position: Vector2

  constructor() { 
    this.position = new Vector2()
    // window.addEventListener('mousemove', this.handleMouseMove)
    // window.addEventListener('touchstart', this.handleMouseClick)
  }

  /**
   * マウスの位置を取得
   * @param e 
   */
  handleMouseClick(e: MouseEvent) {
    this.position.x = (e.clientX / window.innerWidth) * 2 - 1
    this.position.y = - (e.clientY / window.innerHeight) * 2 + 1
  }

  get getMousePosition() {
    return this.position
  }

  /**
   * タッチイベントの位置を取得
   * @param e 
   */
  // private handleMouseClick(e: TouchEvent) {
  //   const { clientX, clientY } = e.touches[0]
  //   const x = (clientX / window.innerWidth) * 2 - 1
  //   const y = - (clientY / window.innerHeight) * 2 + 1
  //   this.position = [x, y]
  // }

  /**
   * リスナーを削除
   */
  dispose() { 
    // window.removeEventListener('mousemove', this.handleMouseMove)
    // window.removeEventListener('touchstart', this.handleMouseClick)
  }
}

export const mouse2d = new mouse2D()
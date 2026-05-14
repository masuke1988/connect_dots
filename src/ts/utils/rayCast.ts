import { Raycaster, Vector2 } from "three"
import { mouse2d } from "./mouse2D"
// import { gl } from '../core/WebGL'
import { rotateMesh } from "./utils"

class rayCast {
  mouse: Vector2

  constructor() {
    this.mouse = new Vector2()
  }

  raycast(gl: any) {
    const raycaster = new Raycaster()
    gl.renderer.domElement.addEventListener('click', (event: MouseEvent) => {
      // debugger
      // console.log(event)
      mouse2d.handleMouseClick(event)
      this.mouse = mouse2d.getMousePosition
      raycaster.setFromCamera(this.mouse, gl.camera)
      const intersects = raycaster.intersectObjects(gl.scene.children, true)

      // console.log(intersects)

      intersects.forEach((mesh) => { 

        // console.log(mesh.object.name)

        if (mesh.object.name === 'cube_1') {
          rotateMesh(gl.group!, 45)
        } 
        if (mesh.object.name === 'cube_2') {
          rotateMesh(gl.group!, 0)
        }
        if (mesh.object.name === 'cube_3') {
          rotateMesh(gl.group!, -45)
        }
      })
    })
  }
}

export const raycast = new rayCast()
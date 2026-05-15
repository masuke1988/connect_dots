import { GUI } from "dat.gui"

export function initGUI(gl: { camera: { position: any } }, params: { minDistance: number }) { 
  const gui = new GUI()

  gui.add(gl.camera.position, "x", -10, 10, 0.1).name("Camera X")
  gui.add(gl.camera.position, "y", -10, 10, 0.1).name("Camera Y")
  gui.add(gl.camera.position, "z", -10, 10, 0.1).name("Camera Z")

  gui.add(params, "minDistance", 0.1, 2, 0.1).name("Min Distance")

  return gui 
}
import { AdditiveBlending, BoxGeometry, BoxHelper, Mesh} from "three/webgpu"

export function boxMeshHelper() {
  const helper = new BoxHelper(new Mesh(new BoxGeometry(2, 2, 2)))
  helper.material.color.setHex(0xffffff)
  helper.material.transparent = true
  helper.material.blending = AdditiveBlending

  return helper
} 
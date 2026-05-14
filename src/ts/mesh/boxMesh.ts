import { BoxGeometry, Mesh, MeshNormalMaterial } from "three"

export function boxMesh() {
  const geo = new BoxGeometry(1, 1, 1)
  const mat = new MeshNormalMaterial({
    wireframe: false,
    transparent: true,
    opacity: 1,
  })
  const mesh = new Mesh(geo, mat)

  return mesh
}
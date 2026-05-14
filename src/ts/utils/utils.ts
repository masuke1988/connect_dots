import gsap from "gsap"
import { Group, MathUtils, Mesh } from "three"

/**
 * document.querySelectorを短縮
 * @param selector セレクタ
 * @returns Element
 */
export function qs<T extends HTMLElement>(selector: string) {
  return document.querySelector<T>(selector)
}

/**
 * document.querySelectorAllを短縮
 * @param selector セレクタ
 * @returns NodeList
 */
export function qsAll(selector: string) {
  return document.querySelectorAll(selector)
}


/**
 * メッシュを回転させる
 * @param mesh 
 * @param deg 
 */
export function rotateMesh(mesh: Group | Mesh, zdeg: number) {

  const tl = gsap.timeline()

  tl.to(mesh.rotation, {
    duration: 1,
    z: MathUtils.degToRad(zdeg),
    ease: "power2.inOut"
  })
}


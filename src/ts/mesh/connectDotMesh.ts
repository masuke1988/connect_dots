import { AdditiveBlending, BufferAttribute, BufferGeometry, DynamicDrawUsage, Points, PointsMaterial } from "three/webgpu"

const particleCount = 1000

export function connectDotMesh() {
  const pointMate = new PointsMaterial({
    size: 3,
    color: 0xffffff,
    transparent: true,
    blending: AdditiveBlending,
    sizeAttenuation: false,
  })

  const particles = new BufferGeometry()
  const particlePositions = new Float32Array(particleCount * 3)
  const particleVelocities = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    // 位置をランダムに初期化（-1〜1の範囲）
    particlePositions.set(
      [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1],
      i * 3
    )

    // 速度をランダムに初期化（-0.1〜0.1の範囲）
    particleVelocities.set(
      [Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1],
      i * 3
    )
  }

  particles.setDrawRange(0, particleCount)
  particles.setAttribute('position', new BufferAttribute(particlePositions, 3).setUsage(DynamicDrawUsage))
  particles.setAttribute('velocity', new BufferAttribute(particleVelocities, 3).setUsage(DynamicDrawUsage))

  const pointCloud = new Points(particles, pointMate)

  return { pointCloud }
}

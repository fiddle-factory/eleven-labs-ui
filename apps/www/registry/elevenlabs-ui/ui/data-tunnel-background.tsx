import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"

const params = {
  colorBg: "#080808",
  colorLine: "#3f2020",
  colorSignal: "#ff4444",
  lineCount: 50,
  globalRotation: 0,
  positionX: 0,
  positionY: 0,
  spreadHeight: 15,
  spreadDepth: 0,
  curveLength: 30,
  straightLength: 60,
  curvePower: 0.8265,
  waveSpeed: 2.48,
  waveHeight: 0.145,
  lineOpacity: 0.3,
  signalCount: 40,
  speedGlobal: 0.345,
  trailLength: 3,
  bloomStrength: 2.0,
  bloomRadius: 0.5,
}

const CONSTANTS = {
  segmentCount: 100,
}

export const DataTunnelBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(params.colorBg)
    scene.fog = new THREE.FogExp2(params.colorBg, 0.003)

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
    camera.position.set(0, 0, 50)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const contentGroup = new THREE.Group()
    params.positionX = (params.curveLength - params.straightLength) / 2
    contentGroup.position.set(params.positionX, params.positionY, 0)
    scene.add(contentGroup)

    // Post-processing
    const renderScene = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      params.bloomStrength,
      params.bloomRadius,
      0.85
    )
    bloomPass.threshold = 0

    const composer = new EffectComposer(renderer)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)

    // Math & Path calculation
    function getPathPoint(
      t: number,
      lineIndex: number,
      time: number
    ): THREE.Vector3 {
      const totalLen = params.curveLength + params.straightLength
      const currentX = -params.curveLength + t * totalLen

      let y = 0
      let z = 0
      const spreadFactor = (lineIndex / params.lineCount - 0.5) * 2

      if (currentX < 0) {
        const ratio = (currentX + params.curveLength) / params.curveLength
        let shapeFactor = (Math.cos(ratio * Math.PI) + 1) / 2
        shapeFactor = Math.pow(shapeFactor, params.curvePower)

        y = spreadFactor * params.spreadHeight * shapeFactor
        z = spreadFactor * params.spreadDepth * shapeFactor

        const waveFactor = shapeFactor
        const wave =
          Math.sin(time * params.waveSpeed + currentX * 0.1 + lineIndex) *
          params.waveHeight *
          waveFactor
        y += wave
      }

      return new THREE.Vector3(currentX, y, z)
    }

    // Materials
    const bgMaterial = new THREE.LineBasicMaterial({
      color: params.colorLine,
      transparent: true,
      opacity: params.lineOpacity,
      depthWrite: false,
    })

    const signalMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      transparent: true,
    })

    const signalColorObj = new THREE.Color(params.colorSignal)

    // Create lines
    const backgroundLines: THREE.Line[] = []
    for (let i = 0; i < params.lineCount; i++) {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(CONSTANTS.segmentCount * 3)
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

      const line = new THREE.Line(geometry, bgMaterial)
      line.userData = { id: i }
      line.renderOrder = 0
      contentGroup.add(line)
      backgroundLines.push(line)
    }

    // Create signals
    interface Signal {
      mesh: THREE.Line
      laneIndex: number
      speed: number
      progress: number
      history: THREE.Vector3[]
      assignedColor: THREE.Color
    }

    const signals: Signal[] = []
    const maxTrail = 100

    for (let i = 0; i < params.signalCount; i++) {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(maxTrail * 3)
      const colors = new Float32Array(maxTrail * 3)

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      const mesh = new THREE.Line(geometry, signalMaterial)
      mesh.frustumCulled = false
      mesh.renderOrder = 1
      contentGroup.add(mesh)

      signals.push({
        mesh,
        laneIndex: Math.floor(Math.random() * params.lineCount),
        speed: 0.2 + Math.random() * 0.5,
        progress: Math.random(),
        history: [],
        assignedColor: signalColorObj.clone(),
      })
    }

    // Animation loop
    const clock = new THREE.Clock()
    let animationId: number

    function animate() {
      animationId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // Update lines
      backgroundLines.forEach((line) => {
        const positions = line.geometry.attributes.position.array as Float32Array
        const lineId = line.userData.id
        for (let j = 0; j < CONSTANTS.segmentCount; j++) {
          const t = j / (CONSTANTS.segmentCount - 1)
          const vec = getPathPoint(t, lineId, time)
          positions[j * 3] = vec.x
          positions[j * 3 + 1] = vec.y
          positions[j * 3 + 2] = vec.z
        }
        line.geometry.attributes.position.needsUpdate = true
      })

      // Update signals
      signals.forEach((sig) => {
        sig.progress += sig.speed * 0.005 * params.speedGlobal

        if (sig.progress > 1.0) {
          sig.progress = 0
          sig.laneIndex = Math.floor(Math.random() * params.lineCount)
          sig.history = []
        }

        const pos = getPathPoint(sig.progress, sig.laneIndex, time)
        sig.history.push(pos)

        if (sig.history.length > params.trailLength + 1) {
          sig.history.shift()
        }

        const positions = sig.mesh.geometry.attributes.position
          .array as Float32Array
        const colors = sig.mesh.geometry.attributes.color.array as Float32Array

        const drawCount = Math.max(1, params.trailLength)
        const currentLen = sig.history.length

        for (let i = 0; i < drawCount; i++) {
          let index = currentLen - 1 - i
          if (index < 0) index = 0

          const p = sig.history[index] || new THREE.Vector3()

          positions[i * 3] = p.x
          positions[i * 3 + 1] = p.y
          positions[i * 3 + 2] = p.z

          let alpha = 1
          if (params.trailLength > 0) {
            alpha = Math.max(0, 1 - i / params.trailLength)
          }

          colors[i * 3] = sig.assignedColor.r * alpha
          colors[i * 3 + 1] = sig.assignedColor.g * alpha
          colors[i * 3 + 2] = sig.assignedColor.b * alpha
        }

        sig.mesh.geometry.setDrawRange(0, drawCount)
        sig.mesh.geometry.attributes.position.needsUpdate = true
        sig.mesh.geometry.attributes.color.needsUpdate = true
      })

      composer.render()
    }

    animate()

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
      composer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      container.removeChild(renderer.domElement)
      backgroundLines.forEach((line) => {
        line.geometry.dispose()
      })
      signals.forEach((sig) => {
        sig.mesh.geometry.dispose()
      })
      bgMaterial.dispose()
      signalMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  )
}


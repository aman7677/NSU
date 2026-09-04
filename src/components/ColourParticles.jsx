import { useEffect, useRef } from 'react'

const defaultColors = ['#ff3417', '#c71545', '#ef1678', '#ff75b7', '#ff761c', '#ffbc16', '#a855f7', '#22d3ee']
const colorWeights = [23, 11, 20, 8, 18, 15, 4, 1]

const pickColor = (colors) => {
  const total = colorWeights.slice(0, colors.length).reduce((sum, weight) => sum + weight, 0)
  let random = Math.random() * total
  for (let index = 0; index < colors.length; index += 1) {
    random -= colorWeights[index] || 1
    if (random <= 0) return colors[index]
  }
  return colors[0]
}

export default function ColourParticles({ particleCount, colors = defaultColors, interactive = true, speed = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    let frameId
    let width = 0
    let height = 0
    let particles = []
    const pointer = { x: -1000, y: -1000, active: false }

    const getCount = () => particleCount || (width < 640 ? 70 : width < 1024 ? 125 : 190)
    const createParticle = () => {
      const depth = Math.random()
      const layer = depth < 0.45 ? 0 : depth < 0.82 ? 1 : 2
      const scale = layer === 0 ? 0.55 : layer === 1 ? 1 : 1.7
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0,
        baseY: 0,
        radius: (0.65 + Math.random() * 2.4) * scale,
        opacity: (layer === 0 ? 0.16 : layer === 1 ? 0.28 : 0.42) + Math.random() * 0.22,
        velocityX: (Math.random() - 0.5) * (layer + 0.45) * 0.16 * speed,
        velocityY: (Math.random() - 0.5) * (layer + 0.45) * 0.14 * speed,
        phase: Math.random() * Math.PI * 2,
        drift: 0.08 + Math.random() * 0.22,
        color: pickColor(colors),
      }
    }
    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      particles = Array.from({ length: getCount() }, createParticle)
    }
    const movePointer = (event) => {
      const bounds = canvas.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
        pointer.active = false
        return
      }
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = true
    }
    const leavePointer = () => { pointer.active = false }
    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.velocityX + Math.sin(time * 0.00035 + particle.phase) * particle.drift
          particle.y += particle.velocityY + Math.cos(time * 0.0003 + particle.phase) * particle.drift
          if (particle.x < -12) particle.x = width + 12
          if (particle.x > width + 12) particle.x = -12
          if (particle.y < -12) particle.y = height + 12
          if (particle.y > height + 12) particle.y = -12
          if (interactive && !coarsePointer && pointer.active) {
            const dx = particle.x - pointer.x
            const dy = particle.y - pointer.y
            const distance = Math.hypot(dx, dy)
            if (distance < 250 && distance > 0.1) {
              // Pull particles towards the mouse (follow effect)
              const force = (1 - distance / 250) * 1.2
              particle.x -= (dx / distance) * force
              particle.y -= (dy / distance) * force
            }
          }
        }
        const shimmer = reducedMotion ? 1 : 0.78 + Math.sin(time * 0.001 + particle.phase) * 0.22
        context.globalAlpha = particle.opacity * shimmer
        context.fillStyle = particle.color
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })
      context.globalAlpha = 1
      if (!reducedMotion) frameId = window.requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    window.addEventListener('pointermove', movePointer, { passive: true })
    window.addEventListener('pointerleave', leavePointer)
    resize()
    draw()
    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', movePointer)
      window.removeEventListener('pointerleave', leavePointer)
      window.cancelAnimationFrame(frameId)
    }
  }, [particleCount, colors, interactive, speed])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}

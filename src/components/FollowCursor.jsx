import { useEffect, useRef } from 'react'

/**
 * Default neon color palette for the cursor's color-cycling effect.
 */
const DEFAULT_COLORS = ['#8B5CF6', '#3B82F6', '#06B6D4', '#EC4899', '#F97316']

/**
 * Parse a hex color string to an { r, g, b } object.
 */
function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

/**
 * Linearly interpolate between two { r, g, b } objects by factor t ∈ [0, 1].
 */
function lerpColor(a, b, t) {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  }
}

/**
 * Walk through an array of parsed RGB colors at a continuous position `pos`.
 * Returns a smoothly interpolated RGB object.
 */
function getColorAtPosition(parsedColors, pos) {
  const len = parsedColors.length
  const i = Math.floor(pos) % len
  const next = (i + 1) % len
  const t = pos - Math.floor(pos)
  return lerpColor(parsedColors[i], parsedColors[next], t)
}

/**
 * Selectors that trigger the hover-expand state.
 */
const HOVER_SELECTORS = 'a, button, [role="button"], .cursor-hover, input[type="submit"], input, textarea, select, summary, nav a'

/**
 * FollowCursor – a premium animated cursor overlay rendered on a full-screen canvas.
 *
 * Props:
 * ───────────────────────────────────────────────────────────────
 * size          – base radius in px (default 10)
 * colors        – array of hex color strings for cycling
 * colorMode     – "rainbow" | "solid"  (default "rainbow")
 * colorSpeed    – how fast colors cycle, 0-5 (default 0.8)
 * smoothing     – lerp factor 0-1 (lower = more lag) (default 0.12)
 * glow          – enable glow ring (default true)
 * glowIntensity – glow shadow blur multiplier (default 1)
 * trail         – enable fading trail (default true)
 * trailLength   – number of trail dots (default 8)
 * hideOnHover   – hide cursor on interactive elements (default true)
 * zIndex        – CSS z-index (default 9999)
 */
export default function FollowCursor({
  size = 10,
  colors = DEFAULT_COLORS,
  colorMode = 'rainbow',
  colorSpeed = 0.8,
  smoothing = 0.12,
  glow = true,
  glowIntensity = 1,
  trail = true,
  trailLength = 8,
  hideOnHover = true,
  zIndex = 9999,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    // ─── Reduced motion ─────────────────────────────────────────
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return          // render nothing

    // ─── Touch devices — hide custom cursor on coarse pointers ──
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (coarse) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ─── Parsed palette ──────────────────────────────────────────
    const parsedColors = colors.map(hexToRgb)

    // ─── Mutable animation state (refs / plain vars → zero re-renders) ──
    let width = 0
    let height = 0
    let dpr = 1
    let frameId = 0

    // Mouse position (raw + smoothed)
    const mouse = { x: -200, y: -200 }
    const smoothMouse = { x: -200, y: -200 }

    // Interaction flags
    let isHovering = false
    let isPressed = false

    // Current rendered radius (smoothly interpolated)
    let currentRadius = size

    // Visibility opacity — smoothly transitions between 0 and 1
    let currentOpacity = 1

    // Pulse / ripple on click
    let pulseRadius = 0
    let pulseAlpha = 0

    // Trail ring buffer
    const trailPositions = Array.from({ length: trailLength }, () => ({ x: -200, y: -200 }))
    let trailIndex = 0
    let trailTimer = 0

    // ─── Resize handler ──────────────────────────────────────────
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // ─── Pointer events ──────────────────────────────────────────
    const handlePointerMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    // ─── Hover detection via event delegation ────────────────────
    // More reliable than elementFromPoint — tracks actual DOM hover state
    let hoverDepth = 0  // track nested interactive elements

    const handleMouseOver = (e) => {
      if (!hideOnHover) return
      const interactive = e.target.closest(HOVER_SELECTORS)
      if (interactive) {
        hoverDepth++
        isHovering = true
      }
    }

    const handleMouseOut = (e) => {
      if (!hideOnHover) return
      const interactive = e.target.closest(HOVER_SELECTORS)
      if (interactive) {
        hoverDepth = Math.max(0, hoverDepth - 1)
        if (hoverDepth === 0) isHovering = false
      }
    }

    const handlePointerDown = () => {
      isPressed = true
      // Trigger pulse only when cursor is visible
      if (currentOpacity > 0.3) {
        pulseRadius = currentRadius
        pulseAlpha = 0.55
      }
    }

    const handlePointerUp = () => {
      isPressed = false
    }

    const handlePointerLeave = () => {
      mouse.x = -200
      mouse.y = -200
      isHovering = false
      hoverDepth = 0
      isPressed = false
    }

    // ─── Main animation loop ─────────────────────────────────────
    const draw = (time) => {
      frameId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, width, height)

      // Smooth follow with lerp
      const lerpFactor = smoothing
      smoothMouse.x += (mouse.x - smoothMouse.x) * lerpFactor
      smoothMouse.y += (mouse.y - smoothMouse.y) * lerpFactor

      // Off-screen guard — don't draw if cursor left the viewport
      if (mouse.x < -100 || mouse.y < -100) return

      // ── Smooth opacity transition on hover ────────────────────
      const targetOpacity = isHovering ? 0 : 1
      currentOpacity += (targetOpacity - currentOpacity) * 0.18

      // Skip all drawing when fully invisible (perf optimisation)
      if (currentOpacity < 0.01) return

      // Target radius — shrink to 0 when hovering, shrink slightly on press
      const targetRadius = isHovering
        ? 0
        : isPressed
          ? size * 0.7
          : size

      currentRadius += (targetRadius - currentRadius) * 0.15

      // ── Color cycling ─────────────────────────────────────────
      const colorPos = colorMode === 'rainbow'
        ? (time * 0.001 * colorSpeed) % parsedColors.length
        : 0
      const baseColor = getColorAtPosition(parsedColors, colorPos)

      const rgbStr = `${Math.round(baseColor.r)}, ${Math.round(baseColor.g)}, ${Math.round(baseColor.b)}`

      // ── Trail ─────────────────────────────────────────────────
      if (trail) {
        trailTimer += 1
        if (trailTimer % 2 === 0) {
          trailPositions[trailIndex] = { x: smoothMouse.x, y: smoothMouse.y }
          trailIndex = (trailIndex + 1) % trailLength
        }

        for (let i = 0; i < trailLength; i++) {
          // Read from oldest → newest
          const idx = (trailIndex + i) % trailLength
          const pos = trailPositions[idx]
          if (pos.x < -100) continue

          const progress = i / trailLength   // 0 = oldest, 1 = newest
          const trailR = currentRadius * (0.2 + progress * 0.55)
          const alpha = progress * 0.22 * currentOpacity

          ctx.beginPath()
          ctx.arc(pos.x, pos.y, Math.max(trailR, 0.1), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgbStr}, ${alpha})`
          ctx.fill()
        }
      }

      // ── Outer glow ring ───────────────────────────────────────
      if (glow) {
        const glowRadius = currentRadius * 1.7
        const glowAlpha = 0.10 * currentOpacity

        ctx.save()
        ctx.beginPath()
        ctx.arc(smoothMouse.x, smoothMouse.y, Math.max(glowRadius, 0.1), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgbStr}, ${glowAlpha})`
        ctx.shadowColor = `rgba(${rgbStr}, ${0.6 * glowIntensity * currentOpacity})`
        ctx.shadowBlur = currentRadius * 3.5 * glowIntensity
        ctx.fill()
        ctx.restore()
      }

      // ── Main cursor circle ────────────────────────────────────
      ctx.save()
      ctx.beginPath()
      ctx.arc(smoothMouse.x, smoothMouse.y, Math.max(currentRadius, 0.1), 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgbStr}, ${0.85 * currentOpacity})`

      if (glow) {
        ctx.shadowColor = `rgba(${rgbStr}, ${0.8 * glowIntensity * currentOpacity})`
        ctx.shadowBlur = currentRadius * 2.5 * glowIntensity
      }

      ctx.fill()
      ctx.restore()

      // ── Inner bright highlight ────────────────────────────────
      ctx.beginPath()
      ctx.arc(smoothMouse.x, smoothMouse.y, Math.max(currentRadius * 0.45, 0.1), 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${0.35 * currentOpacity})`
      ctx.fill()

      // ── Pulse / ripple on click ───────────────────────────────
      if (pulseAlpha > 0.005) {
        pulseRadius += (currentRadius * 4 - pulseRadius) * 0.08
        pulseAlpha *= 0.92

        ctx.save()
        ctx.beginPath()
        ctx.arc(smoothMouse.x, smoothMouse.y, Math.max(pulseRadius, 0.1), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${rgbStr}, ${pulseAlpha * currentOpacity})`
        ctx.lineWidth = 1.5
        ctx.shadowColor = `rgba(${rgbStr}, ${pulseAlpha * 0.6 * currentOpacity})`
        ctx.shadowBlur = 12 * glowIntensity
        ctx.stroke()
        ctx.restore()
      }
    }

    // ─── Bootstrap ────────────────────────────────────────────────
    handleResize()
    frameId = requestAnimationFrame(draw)

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    // ─── Cleanup ──────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [size, colors, colorMode, colorSpeed, smoothing, glow, glowIntensity, trail, trailLength, hideOnHover])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex,
      }}
    />
  )
}

export interface RayLine {
  x1: number
  y1: number
  x2: number
  y2: number
  width: number
}

export interface RadialHatchLine {
  x1: number
  y1: number
  x2: number
  y2: number
}

/** Corona rays for manuscript-style sun. */
export function buildCoronaRays(
  cx: number,
  cy: number,
  count: number,
  innerR: number,
  outerR: number,
  jitter = 0.12,
): RayLine[] {
  const rays: RayLine[] = []
  for (let i = 0; i < count; i++) {
    const base = (i / count) * Math.PI * 2
    const angle = base + (Math.sin(i * 2.7) * jitter)
    const lenMul = 0.75 + (Math.cos(i * 1.9) * 0.5 + 0.5) * 0.35
    const outer = outerR * lenMul
    rays.push({
      x1: cx + Math.cos(angle) * innerR,
      y1: cy + Math.sin(angle) * innerR,
      x2: cx + Math.cos(angle) * outer,
      y2: cy + Math.sin(angle) * outer,
      width: 0.4 + (i % 3) * 0.25,
    })
  }
  return rays
}

/** Radial gold ink strokes on the solar disc. */
export function buildRadialHatch(
  cx: number,
  cy: number,
  count: number,
  innerR: number,
  outerR: number,
): RadialHatchLine[] {
  const lines: RadialHatchLine[] = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    lines.push({
      x1: cx + Math.cos(angle) * innerR,
      y1: cy + Math.sin(angle) * innerR,
      x2: cx + Math.cos(angle) * outerR,
      y2: cy + Math.sin(angle) * outerR,
    })
  }
  return lines
}

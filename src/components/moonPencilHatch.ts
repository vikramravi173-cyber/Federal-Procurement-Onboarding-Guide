export interface HatchLine {
  x1: number
  y1: number
  x2: number
  y2: number
}

/** Parallel pencil strokes for Leonardo-style cross-hatching. */
export function buildParallelHatch(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
  spacing: number,
): HatchLine[] {
  const lines: HatchLine[] = []
  const rad = (angleDeg * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const extent = radius * 2.4

  for (let d = -extent; d <= extent; d += spacing) {
    const x1 = cx + d * cos - extent * sin
    const y1 = cy + d * sin + extent * cos
    const x2 = cx + d * cos + extent * sin
    const y2 = cy + d * sin - extent * cos
    lines.push({ x1, y1, x2, y2 })
  }

  return lines
}

/** Curved strokes that follow lunar latitude bands. */
export function buildCurvedHatch(
  cx: number,
  cy: number,
  radius: number,
  bandCount: number,
): string[] {
  const paths: string[] = []
  for (let i = 1; i < bandCount; i++) {
    const t = i / bandCount
    const ry = radius * (0.25 + t * 0.7)
    const rx = Math.sqrt(Math.max(radius * radius - ry * ry * 0.65, 0)) * 0.92
    const y = cy - radius * 0.55 + t * radius * 1.1
    paths.push(
      `M ${cx - rx} ${y} Q ${cx} ${y + ry * 0.12} ${cx + rx} ${y}`,
    )
  }
  return paths
}

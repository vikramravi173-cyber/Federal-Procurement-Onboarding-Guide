/** Pre-measured Capitol line-art strokes for draw animation (viewBox 0 0 480 260). */
export interface CapitolStroke {
  id: string
  d: string
  length: number
  delay: number
  duration: number
}

export const CAPITOL_STROKES: CapitolStroke[] = [
  { id: 'plaza', d: 'M48 218 H432', length: 384, delay: 0, duration: 0.55 },
  {
    id: 'left-wing',
    d: 'M48 218 V198 H168 V178 H48 V218',
    length: 420,
    delay: 0.12,
    duration: 0.65,
  },
  {
    id: 'right-wing',
    d: 'M432 218 V198 H312 V178 H432',
    length: 420,
    delay: 0.22,
    duration: 0.65,
  },
  {
    id: 'center-base',
    d: 'M168 198 H312 V168 H168 Z',
    length: 388,
    delay: 0.35,
    duration: 0.5,
  },
  {
    id: 'pediment',
    d: 'M178 168 L240 138 L302 168',
    length: 268,
    delay: 0.55,
    duration: 0.45,
  },
  {
    id: 'columns',
    d: 'M192 168 V128 M208 168 V128 M224 168 V128 M240 168 V128 M256 168 V128 M272 168 V128 M288 168 V128',
    length: 336,
    delay: 0.75,
    duration: 0.55,
  },
  {
    id: 'portico',
    d: 'M188 128 H292',
    length: 104,
    delay: 0.95,
    duration: 0.25,
  },
  {
    id: 'drum',
    d: 'M210 128 Q210 108 240 108 Q270 108 270 128',
    length: 145,
    delay: 1.05,
    duration: 0.4,
  },
  {
    id: 'dome',
    d: 'M222 108 Q240 72 258 108',
    length: 118,
    delay: 1.2,
    duration: 0.45,
  },
  {
    id: 'lantern-base',
    d: 'M232 72 H248 V58 H232 Z',
    length: 72,
    delay: 1.45,
    duration: 0.3,
  },
  {
    id: 'spire',
    d: 'M240 58 V32 M234 38 H246',
    length: 58,
    delay: 1.6,
    duration: 0.35,
  },
  {
    id: 'flag',
    d: 'M240 32 V18 M240 18 L252 22 V26 L240 30',
    length: 48,
    delay: 1.85,
    duration: 0.3,
  },
]

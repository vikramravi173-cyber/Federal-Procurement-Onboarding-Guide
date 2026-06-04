/** Lunar near-side features for Vitruvian-style ink drawing (viewBox 0–500). */
export const MOON_VIEW = { cx: 250, cy: 250, r: 210 }

/** Major mare & basin outlines. */
export const MOON_MARIA: string[] = [
  // Oceanus Procellarum
  'M42 155 C55 95 145 75 215 95 C235 125 210 175 155 195 C95 205 48 188 42 155Z',
  // Mare Imbrium
  'M118 118 C155 98 210 108 228 145 C218 178 168 192 128 178 C102 165 108 138 118 118Z',
  // Mare Serenitatis
  'M228 148 C258 138 288 155 282 182 C262 198 232 192 218 172 C212 158 218 152 228 148Z',
  // Mare Tranquillitatis
  'M268 168 C302 162 328 182 318 208 C292 222 262 212 255 188 C252 178 258 172 268 168Z',
  // Mare Crisium
  'M318 142 C348 135 368 158 358 182 C338 195 312 188 308 165 C306 152 312 145 318 142Z',
  // Mare Fecunditatis
  'M298 198 C338 192 362 218 352 248 C322 262 288 248 282 218 C284 208 290 202 298 198Z',
  // Mare Nectaris
  'M278 218 C302 212 322 232 312 252 C292 262 268 252 268 232 C270 224 274 220 278 218Z',
  // Mare Vaporum
  'M238 188 C258 182 272 198 265 215 C248 222 232 212 232 198 C234 192 236 190 238 188Z',
  // Mare Nubium
  'M198 228 C232 218 258 242 248 272 C218 288 178 272 172 242 C176 232 186 228 198 228Z',
  // Mare Humorum
  'M152 248 C182 238 208 262 198 288 C168 302 138 288 132 262 C138 252 144 248 152 248Z',
  // Mare Frigoris (arc north)
  'M155 98 C195 82 248 88 268 108 C252 122 198 128 158 118 C148 112 150 102 155 98Z',
  // Sinus Medii
  'M218 198 C238 192 252 208 242 222 C228 228 212 218 212 205 C214 200 216 198 218 198Z',
]

export interface MoonCrater {
  cx: number
  cy: number
  rx: number
  ry?: number
  /** Interior hatch density 1–3 */
  detail?: number
}

export const MOON_CRATERS: MoonCrater[] = [
  { cx: 198, cy: 118, rx: 22, ry: 20, detail: 3 },
  { cx: 168, cy: 148, rx: 14, ry: 13, detail: 2 },
  { cx: 185, cy: 178, rx: 11, ry: 10, detail: 2 },
  { cx: 128, cy: 172, rx: 16, ry: 14, detail: 2 },
  { cx: 108, cy: 198, rx: 18, ry: 16, detail: 2 },
  { cx: 142, cy: 268, rx: 12, ry: 11, detail: 2 },
  { cx: 218, cy: 248, rx: 20, ry: 18, detail: 3 },
  { cx: 248, cy: 218, rx: 13, ry: 12, detail: 2 },
  { cx: 272, cy: 202, rx: 15, ry: 14, detail: 3 },
  { cx: 298, cy: 228, rx: 12, ry: 11, detail: 2 },
  { cx: 318, cy: 198, rx: 10, ry: 9, detail: 2 },
  { cx: 338, cy: 168, rx: 11, ry: 10, detail: 2 },
  { cx: 268, cy: 128, rx: 9, ry: 8, detail: 1 },
  { cx: 228, cy: 108, rx: 8, ry: 7, detail: 1 },
  { cx: 288, cy: 268, rx: 17, ry: 15, detail: 3 },
  { cx: 308, cy: 248, rx: 11, ry: 10, detail: 2 },
  { cx: 312, cy: 288, rx: 14, ry: 13, detail: 2 },
  { cx: 308, cy: 335, rx: 12, ry: 11, detail: 2 }, // Clavius region
  { cx: 312, cy: 318, rx: 8, ry: 7, detail: 1 },
  { cx: 268, cy: 318, rx: 22, ry: 20, detail: 3 }, // Tycho
  { cx: 178, cy: 268, rx: 16, ry: 14, detail: 2 }, // Copernicus
  { cx: 148, cy: 298, rx: 11, ry: 10, detail: 2 }, // Kepler rays origin
  { cx: 88, cy: 178, rx: 14, ry: 12, detail: 2 }, // Grimaldi
  { cx: 218, cy: 88, rx: 10, ry: 9, detail: 2 },
  { cx: 268, cy: 98, rx: 12, ry: 11, detail: 2 },
  { cx: 298, cy: 118, rx: 9, ry: 8, detail: 1 },
  { cx: 178, cy: 208, rx: 7, ry: 6, detail: 1 },
  { cx: 252, cy: 178, rx: 6, ry: 5, detail: 1 },
  { cx: 198, cy: 238, rx: 8, ry: 7, detail: 1 },
  { cx: 348, cy: 218, rx: 7, ry: 6, detail: 1 },
  { cx: 118, cy: 128, rx: 6, ry: 5, detail: 1 },
]

/** Tycho ray origin. */
export const TYCHO = { cx: 268, cy: 318 }

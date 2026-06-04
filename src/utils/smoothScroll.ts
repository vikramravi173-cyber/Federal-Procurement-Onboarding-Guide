export type ScrollBlock = 'start' | 'center' | 'end' | 'nearest'

function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
}

function getTargetScrollY(element: Element, block: ScrollBlock, offset: number): number {
  const rect = element.getBoundingClientRect()
  const start = window.scrollY
  let target = rect.top + start

  if (block === 'center') {
    target -= (window.innerHeight - rect.height) / 2
  } else if (block === 'end') {
    target -= window.innerHeight - rect.height
  }

  target += offset
  const max = document.documentElement.scrollHeight - window.innerHeight
  return Math.max(0, Math.min(target, max))
}

let activeAnimation = 0

export function smoothScrollToElement(
  element: Element | null | undefined,
  options: { block?: ScrollBlock; offset?: number } = {},
): void {
  if (!element) return

  const block = options.block ?? 'center'
  const offset = options.offset ?? 0

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.scrollIntoView({ behavior: 'auto', block })
    return
  }

  const start = window.scrollY
  const target = getTargetScrollY(element, block, offset)
  const distance = target - start

  if (Math.abs(distance) < 2) return

  cancelAnimationFrame(activeAnimation)

  const duration = Math.min(1100, Math.max(480, Math.abs(distance) * 0.55))
  let startTime: number | null = null

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(1, elapsed / duration)
    window.scrollTo(0, start + distance * easeInOutQuint(progress))
    if (progress < 1) {
      activeAnimation = requestAnimationFrame(step)
    }
  }

  activeAnimation = requestAnimationFrame(step)
}

export function smoothScrollToSelector(
  selector: string,
  options?: { block?: ScrollBlock; offset?: number },
): void {
  smoothScrollToElement(document.querySelector(selector), options)
}

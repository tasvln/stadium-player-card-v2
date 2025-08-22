import { CSS } from 'stitches.config'

type GridAttribute = 'marginBottom' | 'gap'

export const getGridSpacingStyles = (attribute: GridAttribute): CSS => {
  return {
    [attribute]: '$6',
  }
}

const BASELINE_GRID = 4
export function onGridPx(multiplier: number) {
  return toPx(onGrid(multiplier))
}

export function onGrid(multiplier: number) {
  return BASELINE_GRID * multiplier
}

export function toPx(value: number) {
  return `${value}px`
}

export function supportsHover() {
  if (typeof window === 'undefined') {
    return true
  }

  return isTouchDevice() === false
}

export function isTouchDevice() {
  if (typeof window === 'undefined') {
    return false
  }

  return 'ontouchstart' in window.document.documentElement || window.navigator.maxTouchPoints > 0
}

import { CSS, keyframes } from 'stitches.config'

import { onGridPx } from '@/utils/styles'

const fadeInTo: CSS = { transform: 'translateY(0)', opacity: 1 }
const fadeUpInitial: CSS = {
  transform: `translateY(${onGridPx(4)})`,
  opacity: 0,
}
const fadeDownInitial: CSS = {
  transform: `translateY(-${onGridPx(4)})`,
  opacity: 0,
}

export const floatingElementKeyframes = {
  fadeInUp: keyframes({
    from: fadeUpInitial,
    to: fadeInTo,
  }),
  fadeInDown: keyframes({
    from: fadeDownInitial,
    to: fadeInTo,
  }),
  fadeOutUp: keyframes({
    from: fadeInTo,
    to: fadeUpInitial,
  }),
  fadeOutDown: keyframes({
    from: fadeInTo,
    to: fadeDownInitial,
  }),
  longFadeInUp: keyframes({
    from: { transform: 'translate3d(0, 100%, 0)' },
    to: { transform: 'translate3d(0, 0, 0)' },
  }),
  longFadeInDown: keyframes({
    from: { transform: 'translate3d(0, 0, 0)' },
    to: { transform: 'translate3d(0, 100%, 0)' },
  }),
  fadeIn: keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }),
  fadeOut: keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
  }),
  fakeAnimaton: keyframes({
    from: { opacity: 1 },
    to: { opacity: 1 },
  }),
}

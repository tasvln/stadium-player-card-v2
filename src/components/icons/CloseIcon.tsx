import { CSSProperties } from '@stitches/react'
import React from 'react'

function Icon({ size, color }: { size?: CSSProperties['width']; color?: CSSProperties['color'] }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{
        width: size || 24,
        height: size || 24,
        color: color || 'currentColor',
      }}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  )
}

export default React.memo(Icon)

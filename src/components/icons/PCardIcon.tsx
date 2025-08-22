import React from 'react'

type IconProps = {
  width?: string | number
  height?: string | number
  color?: string
}

const Icon = (props: IconProps) => {
  const { width = '200', height = '270', color = '#000' } = props

  return (
    <svg 
      width={width}
      height={height} 
      viewBox="0 0 208 274" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 6.00001C4 4.89544 4.89543 4 6 4H202C203.105 4 204 4.89543 204 6V274H4V6.00001Z" fill="black"/>
      <path d="M104 241H4V122.5V4H104H204V122.5V241H104Z" fill="white"/>
      <path d="M4 241L204 4M4 241H104M4 241V122.5M204 4H104M204 4V122.5M4 4L204 241M4 4H104M4 4V122.5M204 241H104M204 241V122.5M104 241V4M4 122.5H204" stroke="black" strokeWidth="8"/>
      <circle cx="104.191" cy="122.191" r="49.1915" stroke="black" strokeWidth="8"/>
    </svg>

  )
}

export default React.memo(Icon)

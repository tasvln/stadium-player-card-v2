import { ChangeEvent } from 'react'
import { styled } from 'stitches.config'

type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

const Toggle = ({ checked, onChange }: ToggleProps) => {
  return (
    <Checkbox>
      <Slider checked={checked} />
      <input
        type="checkbox"
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
      />
    </Checkbox>
  )
}

export default Toggle

const Checkbox = styled('label', {
  position: 'relative',
  display: 'inline-block',
  width: 30,
  height: 16,

  input: {
    opacity: 0,
    width: 0,
    height: 0,
    '&:checked': {
      backgroundColor: '$buttonBg',
      transform: 'translateX(26px)',
    },
  },
})

const Slider = styled('span', {
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '$bracketBorder',

  '&:before': {
    position: 'absolute',
    content: '',
    height: '10px',
    width: '12px',
    left: '4px',
    bottom: '3px',
    backgroundColor: 'white',
    transition: '.4s',
  },

  variants: {
    checked: {
      true: {
        backgroundColor: '$buttonBg',
        '&:before': {
          transform: 'translateX(10px)',
        },
      },
    },
  },
})

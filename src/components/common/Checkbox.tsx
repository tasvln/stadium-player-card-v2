import { AnimatePresence, motion } from 'framer-motion'
import { styled } from 'stitches.config'
import Image from 'next/image'
import { ChangeEventHandler, ReactNode } from 'react'
import Text from './Text'

const Checkbox: React.FC<{
  name: string
  checked: boolean
  label: ReactNode | string
  rightSide?: boolean
  bgColor?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  size?: 1 | 2 | 3
}> = ({ name, checked, label, rightSide = false, bgColor = '$offGreen', onChange, size = 1 }) => (
  <Container reverse={rightSide} htmlFor={name}>
    <Box
      css={{
        backgroundColor: checked ? bgColor : 'transparent',
        borderColor: checked ? bgColor : '#8e8e8e',
        width: 40,
        height: 20,
        marginTop: 4,
      }}
    >
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            variants={{
              open: {
                opacity: 1,
              },
              closed: {
                opacity: 0,
              },
            }}
          >
            <Image src={'/images/icons/check.svg'} alt="check" fill />
          </motion.div>
        )}
      </AnimatePresence>
      <input type="checkbox" checked={checked} name={name} id={name} onChange={onChange} />
    </Box>
    {typeof label === 'string' ? (
      <Text uppercase size={size} weight="semibold">
        {label}
      </Text>
    ) : (
      label
    )}
  </Container>
)

export default Checkbox

const Container = styled('label', {
  display: 'flex',
  // alignItems: 'center',
  cursor: 'pointer',

  variants: {
    reverse: {
      true: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
      },
    },
  },
})

const Box = styled(motion.div, {
  border: '1px solid #8e8e8e',
  height: 18,
  width: 18,
  marginRight: 10,
  borderRadius: 2,
  position: 'relative',
  transition: 'ease-in-out 0.1s',

  img: {
    padding: 2,
  },
})

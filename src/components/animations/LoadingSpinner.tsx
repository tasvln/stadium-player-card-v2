import { MotionBox } from './Motion'
import ConditionalWrapper from '../common/ConditionalWrapper'
import { Box } from '../common'

const LoadingSpinner: React.FC<{ size?: number; fillAndCenter?: boolean }> = ({ size = 25, fillAndCenter = false }) => {
  return (
    <ConditionalWrapper
      condition={fillAndCenter}
      wrapper={(children) => (
        <Box
          css={{
            minHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      )}
    >
      <MotionBox
        css={{
          width: size,
          height: size,
          border: '2px solid $black10',
          borderTopColor: '$black100',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </ConditionalWrapper>
  )
}

export default LoadingSpinner

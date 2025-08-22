import { Box, Button, Flex, Text } from '@/components/common'
import { CloseIcon } from '@/components/icons'
import { styled } from 'stitches.config'

type HeaderProps = {
  title: string
  handleClose: () => void
}

const Header: React.FC<HeaderProps> = ({ title, handleClose }) => {
  return (
    <Wrapper>
      <Box css={{ position: 'relative', width: '100%' }}>
        <Text weight="bold" uppercase size={1} center>
          {title}
        </Text>
      </Box>
      <Flex
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 4,
        }}
      >
        <Button variant="ghost" size={0} css={{ padding: 0, height: 25, width: 25 }} onClick={handleClose}>
          <CloseIcon />
        </Button>
      </Flex>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '$white80',
  backdropFilter: 'blur(10px)',
  top: 0,
  left: 0,
  height: 'auto',
  backgroundColor: '#d2d2d2',
  paddingY: '$2',
  width: '100%',
})

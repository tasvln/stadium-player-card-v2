import { styled } from 'stitches.config'

import Text from './Text'

const Heading = styled('h2', Text, {
  fontFamily: '$heading',
  // fontWeight: '$semibold',
  textTransform: 'uppercase',
  fontSize: '$8',
  lineHeight: '$-1',
  color: '$heading',

  variants: {
    tracking: {
      tight: {
        letterSpacing: '$-1',
      },
    },
    leading: {
      tight: {
        lineHeight: '$1',
      },
    },
  },
})

export const H1Heading = styled('h1', Heading, {})
export const H2Heading = styled('h2', Heading, {})
export const H3Heading = styled('h3', Heading, {})
export const DivHeading = styled('div', Heading, {})

export default Heading

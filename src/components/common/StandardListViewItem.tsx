import React, { ComponentProps, ReactNode } from 'react'
import { Button, Flex, Text } from '@/components/common'
import Link from 'next/link'
import { styled } from '@stitches/react'

type StandardListViewItemProps = ComponentProps<typeof Flex> & {
  title?: ReactNode
  description?: ReactNode
  controls?: ReactNode
  link: string
  viewButtonText?: ReactNode
  preview?: ReactNode
}

export default function StandardListViewItem({
  title,
  description,
  controls,
  preview,
  link,
  viewButtonText,
  ...props
}: StandardListViewItemProps) {
  return (
    <Flex css={motionFlexStyles} {...props}>
      <Text css={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Link href={link}>
          <PreviewWrapper>{preview}</PreviewWrapper>
        </Link>
      </Text>
      <Footer>
        <Link href={link}>
          <Title>{title}</Title>
        </Link>
        <Description>{description}</Description>
        <FooterControls>
          {controls}
          <Link href={link}>
            <Button variant="primary">{viewButtonText}</Button>
          </Link>
        </FooterControls>
      </Footer>
    </Flex>
  )
}

const PreviewWrapper = styled('div', {
  margin: '10px 0',
  width: 'calc(100% - 20px)',
  cursor: 'pointer',
})

const Title = styled('h3', {
  fontFamily: '"JetBrains Mono", monospace',
  fontWeight: 800,
  textTransform: 'uppercase',
  fontSize: 20,
  lineHeight: 1,
  margin: '14px 14px',
  cursor: 'pointer',
})

const Description = styled('div', {
  fontFamily: '"JetBrains Mono", monospace',
  textTransform: 'uppercase',
  fontSize: 12,
  lineHeight: 1,
  margin: '14px 14px',
})

const Footer = styled('div', {
  background: '#D1D6D6',
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  width: '100%',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
})

const FooterControls = styled('div', {
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  padding: '14px',
})

const motionFlexStyles = {
  backgroundColor: '$white100',
  width: '100%',
  borderRadius: '$2',
  boxShadow: '$regular0',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'default',
  '&:hover': {
    boxShadow: '$regular2',
    [Title as any]: {
      color: '#4A1EDE',
    },
  },
}

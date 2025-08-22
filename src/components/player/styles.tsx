import { styled } from 'stitches.config'

export const Container = styled('div', {
  width: '100%',
  background: '$white',
  border: '3px solid $border',
})

export const Top = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  background: '$border',
})

export const Switch = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

export const SwitchButton = styled('button', {
  width: '50%',
  height: 36,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid $border',
  padding: '0 10px',
  background: '$cardSel',

  '&:first-child': {
    borderRight: '1px solid $border',
  },

  variants: {
    active: {
      true: {
        background: '$white',
      },
    },
    frames: {
      true: {
        background: 'rgba($color: #000000, $alpha: 0.1)',
      },
    },
  },
})

export const ScrollContainer = styled('div', {
  padding: 20,
  overflowY: 'scroll',
  '-ms-overflow-style': 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
})

export const SelectButton = styled('button', {
  position: 'relative',
  width: '100%',
  height: '78px',

  variants: {
    active: {
      true: {
        border: '3px solid $black',
        outline: 'none',
      },
    },
  },

  '@md': {
    width: 100,
    height: 100,

    '& img': {
      borderRadius: 9999,
    },
  },
})

export const BgBox = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'auto',
  gap: 14,
  height: '100%',
  width: '100%',
  '-ms-overflow-style': 'none',
  scrollbarWidth: 'thin',
  paddingBottom: 10,
  scrollbarColor: '$black $border',

  '&::-webkit-scrollbar': {
    height: 10,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '$border',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '$black',
  },
})

export const PreButton = styled('button', {
  background: '$border',
  fontWeight: '700',
  fontSize: '0.75rem',
  padding: '10px 24px',
  textTransform: 'uppercase',

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export const Input = styled('input', {
  width: '100%',
  background: '$inputBg2',
  borderBottom: '3px solid $border',
  padding: 14,
  resize: 'none',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  fontWeight: '700',
})

export const List = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  'span, p': {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '$grey',
    textTransform: 'uppercase',
  },

  variants: {
    top: {
      true: {
        borderBottom: '3px solid $border',
        paddingBottom: 4,

        'span, p': {
          color: '$black',
        },
      },
    },
  },
})

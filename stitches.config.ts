import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

import { toMs } from '@/utils/animation'
import typography from '@/css/tokens/typography'
import sizes from '@/css/avatars'
import shadows from '@/css/tokens/shadows'
import space from '@/css/tokens/space'
import { ANIMATION_DURATIONS } from '@/css/tokens/motion'
import colors from '@/css/tokens/colors'

import { JetBrains_Mono } from 'next/font/google'

const jb = JetBrains_Mono({ subsets: ['latin'] });

const stitches = createStitches({
  theme: {
    colors: {
      black: '#000',
      black0: colors.black[0],
      black1: colors.black[1],
      black2: colors.black[2],
      black3: colors.black[3],
      black4: colors.black[4],
      black5: colors.black[5],
      black10: colors.black[10],
      black15: colors.black[15],
      black20: colors.black[20],
      black25: colors.black[25],
      black30: colors.black[30],
      black35: colors.black[35],
      black40: colors.black[40],
      black45: colors.black[45],
      black50: colors.black[50],
      black60: colors.black[60],
      black70: colors.black[70],
      black80: colors.black[80],
      black90: colors.black[90],
      black100: colors.black[100],

      white: '#fff',
      white0: colors.white[0],
      white1: colors.white[1],
      white2: colors.white[2],
      white3: colors.white[3],
      white4: colors.white[4],
      white5: colors.white[5],
      white10: colors.white[10],
      white15: colors.white[15],
      white20: colors.white[20],
      white25: colors.white[25],
      white30: colors.white[30],
      white35: colors.white[35],
      white40: colors.white[40],
      white45: colors.white[45],
      white50: colors.white[50],
      white60: colors.white[60],
      white70: colors.white[70],
      white80: colors.white[80],
      white90: colors.white[90],
      white100: colors.white[100],

      red: '#FF3030',
      red100: '#FF3030',

      //TODO create color palette for reds and greys with 0-100 values
      // red100: '#F93A3A',
      red10: '#ffe9ea',
      red20: 'rgba(249, 58, 58, 0.2)',
      red5: '#fef5f5',

      offPurple: '#D6AFF4',
      orange: '#FF5900',
      yellow: '#ff8e26',
      border: '#DFDFDF',

      // default colors
      greyBg: '#F2F2F2',
      heading: '#383e42',
      buttonBg: '#1f2a32',
      grey: '#757575',
      grey100: '#C5C5C5',
      borderDark: '#53697A',
      stroke: '#5D7488',
      subspan: '#454545',
      subspanTwo: '#4B4B4B',
      pillBg: '#F0F2F5',
      cardSel: '#F7F7F7',
      subTextColor: '#66757F',
      homeGreyBg: '#F1F2F2',
      homeBlueBg: '#EAF2F9',
      dayBtnBg: '#99a6af',
      mainBg: '#12181d',
      inputBg: '#cdcdcd',
      inputHvr: '#e0e0e0',

      tabContentBg: '#F0F3F4',

      // components colors
      // inputBg: '#E6E6E6',
      sideBg: '#ECECEC',
      cardGrey: '#E1E1E1',
      algBg: 'rgba(219, 219, 219, 0.5)',
      inputBg2: '#FBFBFB',
      inputDisabledBg: '#DBDDE3',
      inputPlaceholder: '#A0A8AF',
      bracketBorder: '#ccc',
      leaguePillBg: '#d9d9d9',
      strokeGrey: '#BFBEA7',
      regBg: '#ddd',

      offGreen: '#AFF4C6',
      // green100: '#24be74',
      // green10: '#e4f9ef',

      // colors for event placements
      gold: '#FBFCC5',
      silver: '#FAFAFA',
      bronze: '#DBC8BC',

      // This is the minimum transparent black that passes a11y standards with white text
      overlay: 'rgba(0,0,0,0.54)',

      stadiumElectric: '#E6DE19',
    },
    heights: {
      navbar: '90px',
      mobileNavbar: '60px',
      marquee: '50px',
    },
    fonts: {
      body: `"JetBrains Mono", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
      mono: `"JetBrains Mono", monospace, Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`,
      heading: `"Tungsten", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
      jb: `${jb.style.fontFamily}, sans-serif`,
      tungsten: `"Tungsten", sans-serif`,
    },
    fontSizes: {
      0: `${typography.fontSizes[0]}px`,
      1: `${typography.fontSizes[1]}px`,
      2: `${typography.fontSizes[2]}px`,
      3: `${typography.fontSizes[3]}px`,
      4: `${typography.fontSizes[4]}px`,
      5: `${typography.fontSizes[5]}px`,
      6: `${typography.fontSizes[6]}px`,
      7: `${typography.fontSizes[7]}px`,
      8: `${typography.fontSizes[8]}px`,
      9: `${typography.fontSizes[9]}px`,
      10: `${typography.fontSizes[10]}px`,
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      ultraBold: 800,
    },
    // TODO: create new tokens for line heights and letter spacings to fit the fonts
    letterSpacings: {
      mono: '0.0725em',
      0: `${typography.letterSpacings[0] / 100}em`,
      [-1]: `${typography.letterSpacings[-1] / 100}em`,
      [-2]: `${typography.letterSpacings[-2] / 100}em`,
      [-3]: `${typography.letterSpacings[-3] / 100}em`,
    },
    lineHeights: {
      [-1]: typography.lineHeights['heading'],
      0: typography.lineHeights['base'],
      1: typography.lineHeights['sub'],
      2: typography.lineHeights['mid'],
      3: typography.lineHeights['body'],
      formElement0: `${sizes.formElementHeights[0]}px`,
      formElement1: `${sizes.formElementHeights[1]}px`,
      formElement2: `${sizes.formElementHeights[2]}px`,
    },
    radii: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      round: '9999px',
    },
    shadows,
    sizes: {
      formElement0: `${sizes.formElementHeights[0]}px`,
      formElement1: `${sizes.formElementHeights[1]}px`,
      formElement2: `${sizes.formElementHeights[2]}px`,
      avatar0: `${sizes.avatars[0]}px`,
      avatar1: `${sizes.avatars[1]}px`,
      avatar2: `${sizes.avatars[2]}px`,
      icon0: `${sizes.icons[0]}px`,
      icon1: `${sizes.icons[1]}px`,
      icon2: `${sizes.icons[2]}px`,
      icon3: `${sizes.icons[3]}px`,
      icon4: `${sizes.icons[4]}px`,
      container: '1600px',
    },
    space: {
      0: `${space[0]}px`,
      1: `${space[1]}px`,
      2: `${space[2]}px`,
      3: `${space[3]}px`,
      4: `${space[4]}px`,
      5: `${space[5]}px`,
      6: `${space[6]}px`,
      7: `${space[7]}px`,
      8: `${space[8]}px`,
      9: `${space[9]}px`,
      10: `${space[10]}px`,
      11: `${space[11]}px`,
    },
    transitions: {
      0: toMs(ANIMATION_DURATIONS[0]),
      1: toMs(ANIMATION_DURATIONS[1]),
      2: toMs(ANIMATION_DURATIONS[2]),
      3: toMs(ANIMATION_DURATIONS[3]),
      ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
      expo: 'cubic-bezier(0.19, 1, 0.22, 1)',
    },
  },
  media: {
    sm: '(max-width: 600px)',
    md: '(max-width: 768px)',
    lg: '(max-width: 1200px)',
    xl: '(max-width: 1536px)',
    '2xl': '(max-width: 2100px)',
    // TODO: update to fit into the bp* naming scheme
    bpxs: '(max-width: 350px)',

    ['bp0-max']: '(max-width: 639px)',
    bp0: '(min-width: 640px)',
    ['bp1-max']: '(max-width: 831px)',
    bp1: '(min-width: 832px)',
    ['bp2-max']: '(max-width: 1023px)',
    bp2: '(min-width: 1024px)',
    ['bp3-max']: '(max-width: 1151px)',
    bp3: '(min-width: 1152px)',
    ['bp4-max']: '(max-width: 1279px)',
    bp4: '(min-width: 1280px)',
    ['bp5-max']: '(max-width: 1476px)',
    bp5: '(min-width: 1477px)',

    hover: '(hover: hover)',
  },
  utils: {
    linearGradient: (value: string) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),
    truncate: (value: boolean) => {
      if (value !== true) return {}

      return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }
    },
    marginX: (value: Stitches.ScaleValue<'space'> | Stitches.PropertyValue<'margin'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: Stitches.ScaleValue<'space'> | Stitches.PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: Stitches.ScaleValue<'space'> | Stitches.PropertyValue<'padding'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: Stitches.ScaleValue<'space'> | Stitches.PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
  prefix: 'st-',
})

/**
 * Using `any` is a workaround to improve performance issues.
 * Usually we want to avoid `any`, but here's it's worth it to keep `tsc` relatively fast.
 *
 * Be very careful when changing this, and make sure it doesn't cause noticable changes in the
 * time it takes for type-checking to run in CI, and for builds on Vercel.
 *
 * Ideally we will eventually be able to change this to...
 * @example
 * export type CSS = Stitches.CSS<typeof config>;
 *
 * @see https://github.com/stitchesjs/stitches/issues/1038
 */
export type CSS = Stitches.CSS<typeof config>

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = stitches

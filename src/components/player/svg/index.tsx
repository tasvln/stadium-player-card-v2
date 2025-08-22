/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'

import { SideLogo } from './sections/sideLogo'
import CustomBgFx from './sections/customBgFx'
import CustomBg from './sections/customBg'
import CustomBgTwo from './sections/customBgTwo'

import { usePlayerCardSVGText } from '@/hooks/usePlayerSvgText'

const CARD_WIDTH = 344
const CARD_HEIGHT = 476

interface CreatePlayerCard {
  name?: string
  icon?: string
  color?: string
  iconFrame?: string
  title?: string
  background?: string
  artistName?: string
  bgName?: string
  cardNo?: string
  colorName?: string
  id?: string
  setLoading?: (bool: boolean) => void
}

const PlayerCard = React.forwardRef<any, CreatePlayerCard>((props, ref) => {
  const {
    id,
    name,
    icon,
    color,
    iconFrame,
    title,
    background,
    artistName,
    bgName,
    cardNo,
    colorName,
    setLoading,
  } = props
  const { printName, printTitle, printArtistName, printCardNo, printBgName, textDefault, bgPathDefault } =
    usePlayerCardSVGText({ name, title, artistName, cardNo, bgName, color, colorName })
  const [captionColor, setCaptionColor] = useState<string>('#000')

  const [printBg, setPrintBg] = useState<any>()
  const [printIcon, setPrintIcon] = useState<any>()
  const [printFrame, setPrintFrame] = useState<any>()

  useEffect(() => {
    if (bgName === 'stadium' || 
        bgName === 'arena' || 
        bgName === `gaia's sinew` || 
        bgName === 'hollow sunset' || 
        bgName === 'black morrow' || 
        bgName === 'pledge') {
      setCaptionColor('#fff')
    } else {
      setCaptionColor('#000')
    }
  }, [bgName])

  React.useEffect(() => {
    setLoading!(true)
    const img: HTMLImageElement = document.createElement('img')
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 2158
      canvas.height = 2985
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/jpeg')
      setPrintBg(dataURL)
      setLoading!(false)
    }
    img.setAttribute('crossOrigin', 'anonymous') //
    img.src = background as string
    // if (background) {
    //   const darkBgs: string[] = ['acolytesPledge', 'gaiasSinew', 'blackMarrow', 'hollowSunset', 'theWizard', 'reaper']
    //   const hasDarkBg = darkBgs.some((bg) => background.includes(bg))
    //   if (hasDarkBg) setCaptionColor('White')
    //   else setCaptionColor('Black')
    // } else setCaptionColor('')
  }, [background, setLoading])

  React.useEffect(() => {
    setLoading!(true)
    const img = document.createElement('img')
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 816
      canvas.height = 816
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/png')
      setPrintFrame(dataURL)
      setLoading!(false)
    }
    img.setAttribute('crossOrigin', 'anonymous') //
    img.src = iconFrame as string
  }, [iconFrame, setLoading])

  React.useEffect(() => {
    setLoading!(true)
    const img = document.createElement('img')
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1489
      canvas.height = 1489
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/png')
      setPrintIcon(dataURL)
      setLoading!(false)
    }
    img.setAttribute('crossOrigin', 'anonymous') //
    img.src = icon as string
  }, [icon, setLoading])

  return (
    <svg
      id={id}
      ref={ref}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      fill="none"
      role={'img'}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 344 476"
    >
      {/* Card Background */}
      <g xmlns="http://www.w3.org/2000/svg">
        <rect width="343.37" height="474.958" rx="10" fill={color} />
        <mask
          xmlns="http://www.w3.org/2000/svg"
          id="mask0_1065_4385"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="344"
          height="476"
        >
          <rect width="343.37" height="475.15" rx="10" fill="#D9D9D9" />
          <rect width="343.37" height="475.15" rx="10" stroke="black" />
        </mask>
        <ellipse
          xmlns="http://www.w3.org/2000/svg"
          cx="171.594"
          cy="241.796"
          rx="159.657"
          ry="105.975"
          fill="url(#paint1_radial_897_2265)"
          fillOpacity="0.2"
        />
      </g>
      <g xmlns="http://www.w3.org/2000/svg" mask="url(#mask0_1065_4385)">
        {background != '' && <rect width="343.37" height="474.958" rx="10" fill="url(#pattern0)" />}
        {!background && (
          <g>
            {/* FXs */}
            {bgName === 'stadium' && <CustomBg bgPathColor={bgPathDefault} color={color} />}
            {bgName === 'arena' && <CustomBgTwo bgPathColor={bgPathDefault} color={color} />}
            <CustomBgFx />
            <rect
              xmlns="http://www.w3.org/2000/svg"
              x="-0.316406"
              width="344"
              height="476.41"
              fill="url(#paint2_linear_897_2265)"
              fillOpacity="0.32"
            />
          </g>
        )}
        <g>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M338 439.584L-0.5 439.583L-0.499999 473L338 473L338 439.584Z"
            fill={color}
            stroke={color}
            strokeWidth="6"
          />
          <path fill={textDefault} d={printArtistName} />
          <path fill={textDefault} d={printBgName} />
          <path fill={textDefault} d={printCardNo} />
        </g>
        <rect
          xmlns="http://www.w3.org/2000/svg"
          width="343.37"
          height="475.15"
          rx="10"
          stroke={color}
          strokeWidth="12"
        />
        {background && <SideLogo />}
      </g>
      {/* Player Details */}
      <g xmlns="http://www.w3.org/2000/svg">
        <g xmlns="http://www.w3.org/2000/svg">
          <circle
            xmlns="http://www.w3.org/2000/svg"
            cx="173.5"
            cy="171.2"
            r="51.4"
            fill={color}
            stroke="#fff"
            strokeWidth="3"
          />
          <rect
            xmlns="http://www.w3.org/2000/svg"
            x="122.979"
            y="120.979"
            width="101.062"
            height="100.021"
            rx="50.0103"
            fill="url(#pattern1)"
          />
          {iconFrame != '' && (
            <rect xmlns="http://www.w3.org/2000/svg" x="36" y="34" width="272" height="272" fill="url(#pattern6)" />
          )}
          <g>
            <circle
              xmlns="http://www.w3.org/2000/svg"
              cx="172.9"
              cy="224.4"
              r="15.5"
              fill="url(#paint0_linear_969_2423)"
            />
            <circle
              xmlns="http://www.w3.org/2000/svg"
              cx="172.9"
              cy="224.4"
              r="11"
              fill={color == '#000000' ? '#ffffff' : color}
            />
          </g>
        </g>
        <g xmlns="http://www.w3.org/2000/svg">
          <path fill={captionColor} d={printName} />
          {title != '' && <path fill={captionColor} d={printTitle} />}
        </g>
      </g>
      <defs xmlns="http://www.w3.org/2000/svg">
        {/* Frame Gradients */}
        <linearGradient
          xmlns="http://www.w3.org/2000/svg"
          id="paint0_linear_969_2423"
          x1="175.763"
          y1="217.158"
          x2="166.789"
          y2="251.421"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color == '#000000' ? '#ffffff' : color} />
          <stop offset="1" />
        </linearGradient>

        {/* Bg Image */}
        <pattern
          xmlns="http://www.w3.org/2000/svg"
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_879_2325" transform="scale(0.000463392 0.000335008)" />
        </pattern>
        <image xmlns="http://www.w3.org/2000/svg" id="image0_879_2325" width="2158" height="2985" href={printBg} />

        {/* Icon Image */}
        <pattern
          xmlns="http://www.w3.org/2000/svg"
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image5_879_2325" transform="scale(0.000671592)" />
        </pattern>
        <image xmlns="http://www.w3.org/2000/svg" id="image5_879_2325" width="1489" height="1489" href={printIcon} />

        {/* Frame Image */}
        <pattern
          xmlns="http://www.w3.org/2000/svg"
          id="pattern6"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image6_969_2423" transform="scale(0.00122549)" />
        </pattern>
        <image xmlns="http://www.w3.org/2000/svg" id="image6_969_2423" width="816" height="816" href={printFrame} />

        {/* Dynamic Image Gradients, Image & Pattern */}
        <linearGradient
          xmlns="http://www.w3.org/2000/svg"
          id="paint2_linear_897_2265"
          x1="304.761"
          y1="3.69145e-06"
          x2="25.2465"
          y2="467.675"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" stopOpacity="0.21" />
          <stop offset="0.431209" stopColor="#D9D9D9" stopOpacity="0.568791" />
          <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
})

PlayerCard.displayName = 'PlayerCard'

export default PlayerCard
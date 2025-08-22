import colors from './colors'

const shadows = {
  regular0: `0px 0px 2px ${colors.black[15]}, 0px 2px 5px ${colors.black[5]}, 0px 8px 40px ${colors.black[4]}`,
  regular1: `0px 0px 2px ${colors.black[15]}, 0px 4px 7px ${colors.black[5]}, 0px 12px 40px ${colors.black[10]}`,
  regular2: `0px 0px 2px ${colors.black[15]}, 0px 4px 7px rgba(0, 0, 0, 0.07), 0px 12px 40px ${colors.black[15]}`,
  soft0: `0px 0px 4px ${colors.black[2]}, 0px 8px 16px ${colors.black[2]}, 0px 16px 32px ${colors.black[4]}`,
  soft1: `0px 0px 4px ${colors.black[2]}, 0px 10px 16px ${colors.black[3]}, 0px 18px 32px ${colors.black[5]}`,
  soft2: `0px 0px 4px ${colors.black[2]}, 0px 12px 16px ${colors.black[4]}, 0px 20px 32px rgba(0, 0, 0, 0.08)`,
}
export default shadows

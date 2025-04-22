import { definePreset } from '@unocss/core'

const remRE = /(-?[.\d]+)rem/g

export interface RemToPxOptions {
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number

  /**
  * @default px
  */
  unit?: 'px' | 'rem' | 'rpx' | 'upx' | 'em' | 'cm' | 'mm' | '%'
}

/**
 * @see https://unocss.dev/presets/rem-to-px
 */
export const presetRemToPx = definePreset((options: RemToPxOptions = {}) => {
  const {
    baseFontSize = 16,
    unit = 'px'
  } = options

  return {
    name: '@unocss/preset-rem-to-px',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && remRE.test(value))
          i[1] = value.replace(remRE, (_, p1) => `${p1 * baseFontSize}${unit}`)
      })
    },
  }
})

export default presetRemToPx

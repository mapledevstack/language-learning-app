import type { COLOR_THEMES } from "@/constants/colorThemes"

export type ColorTheme = (typeof COLOR_THEMES)[number]

export const setColorTheme = (theme: ColorTheme) => {
  document.documentElement.dataset.theme = theme
}

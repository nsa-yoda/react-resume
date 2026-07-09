import ClassicTheme from './classic/ClassicTheme'
import StackedTheme from './stacked/StackedTheme'

export const themes = {
  classic: ClassicTheme,
  stacked: StackedTheme,
}

export const resolveTheme = themeName => themes[themeName] || themes.classic

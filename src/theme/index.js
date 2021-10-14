/**
 * Shared theme.
 */
const Common = {
  dashboardTitleFontSize: '2rem',
}

/**
 * Light theme.
 */
export const LightTheme = {
  ...Common,
  pageBackgroundColor: 'hsl(0,0%,90%)',
  pageForegroundColor: 'hsl(0,0%,5%)',
  modalShadowColor: 'hsla(0,0%,0%,.1)',
  modalBackgroundColor: 'hsl(0,0%,95%)',
  widgetBackgroundColor: 'hsl(0,0%,100%)',
  widgetBackgroundAccent: 'hsl(0,0%,95%)',
  widgetForegroundColor: 'hsl(0,0%,5%)',
  widgetShineColor: 'hsl(0,0%,10%)',
  widgetTitleOpacity: .45,
  widgetInputBackgroundColor: 'hsl(0,0%,95%)',
  widgetInputForegroundColor: 'hsl(0,0%,5%)',
}

/**
 * Dark theme.
 */
export const DarkTheme = {
  ...Common,
  pageBackgroundColor: 'hsl(0,0%,0%)',
  pageForegroundColor: 'hsl(0,0%,90%)',
  modalShadowColor: 'hsla(0,0%,0%,1)',
  modalBackgroundColor: 'hsl(0,0%,10%)',
  widgetBackgroundColor: 'hsl(0,0%,10%)',
  widgetBackgroundAccent: 'hsl(0,0%,5%)',
  widgetForegroundColor: 'hsl(0,0%,90%)',
  widgetShineColor: 'hsl(0,0%,100%)',
  widgetTitleOpacity: .5,
  widgetInputBackgroundColor: 'hsl(0,0%,20%)',
  widgetInputForegroundColor: 'hsl(0,0%,90%)',
}

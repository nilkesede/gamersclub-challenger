
export const cleanSelector = (selector: string): string => {
  return selector.replace(/\./g, '').replace(/#/g, '')
}

export const getCleanMapName = (csgoMapName: string) => {
  return csgoMapName.replaceAll("de_", "")
}

String.prototype.cleanCSSSelector = function (): string {
  return cleanSelector(this as string)
}

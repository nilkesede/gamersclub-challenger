
export const cleanSelector = (selector: string): string => {
  return selector.replace(/\./g, '').replace(/#/g, '')
}

export const getIdByAvatarUrl = (avatarUrl: string): string => {
  const matches = avatarUrl.match(/\/[0-9]+\//)
  return matches && matches.length ? matches[0].replace(/\//g, '') : ''
}

export const getCleanMapName = (csgoMapName: string) => {
  return csgoMapName.replaceAll("de_", "")
}

String.prototype.cleanCSSSelector = function (): string {
  return cleanSelector(this as string)
}


export const cleanSelector = (selector: string): string => selector.replace(/\./g, '')

export const getIdByAvatarUrl = (avatarUrl: string): string => {
  const matches = avatarUrl.match(/\/[0-9]+\//)
  return matches && matches.length ? matches[0].replace(/\//g, '') : ''
}

String.prototype.cleanCSSSelector = function (): string {
  return cleanSelector(this as string)
}

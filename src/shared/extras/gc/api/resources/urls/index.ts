type UserId = string | number;
export const gcSiteUrl = window.location.hostname === 'localhost' ? 'https://gamersclub.com.br' : window.location.origin

export const gcPages = {
  lobby: `${gcSiteUrl}/lobby`,
  login: `${gcSiteUrl}/auth`
}

export const gcUrls = {
  player(userId: UserId){
    return `${gcSiteUrl}/player/${userId}`
  },

  match(matchId: string | number){
    return `${gcSiteUrl}/lobby/match/${matchId}`
  },

  boxInitialMatches(userId: UserId) {
    return `${gcSiteUrl}/api/box/init/${userId}`
  },

  boxMatchesHistory(userId: UserId){
    return `${gcSiteUrl}/api/box/history/${userId}`
  },
}

export const gcAssetsUrls = {
  pushimentCard(){
    return 'https://gamersclub.com.br/assets/images/punishment/warning-card.svg'
  },

  backgroundLevel(level: number | string){
    return `https://gamersclub.com.br/assets/images/level/${level}.svg`
  }
}
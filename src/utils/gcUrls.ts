type UserId = string | number;

export const gcUrls = {
  player(userId: UserId){
    return `https://gamersclub.com.br/jogador/${userId}`
  },

  boxInitialMatches(userId: UserId) {
    return `https://gamersclub.com.br/api/box/init/${userId}`
  },

  boxMatchesHistory(userId: UserId){
    return `https://gamersclub.com.br/api/box/history/${userId}`
  }
}
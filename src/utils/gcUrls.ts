type UserId = string | number;

export const gcUrls = {
  boxInitialMatches(userId: UserId) {
    return `https://gamersclub.com.br/api/box/init/${userId}`
  },

  boxMatchesHistory(userId: UserId){
    return `https://gamersclub.com.br/api/box/history/${userId}`
  }
}
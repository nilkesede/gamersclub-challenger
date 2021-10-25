type UserId = string | number;

export const gcUrls = {
  boxMatchesHistory(userId: UserId){
    return `https://gamersclub.com.br/api/box/history/${userId}`
  }
}
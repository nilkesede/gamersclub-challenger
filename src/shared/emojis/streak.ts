import { BooleanNumber } from "@/scripts/lobby/domain/BooleanNumber"

export const winStreakMap = {
  1: '😌',
  2: '😄',
  3: '🔥',
  4: '⚡',
  7: '🛡️'
}

export const lossStreakMap: Record<number, string> = {
  1: '😒',
  2: '😪',
  3: '🤕',
  4: '😭',
  7: '💀'
}


const getEmoji = (streak: number, emojiMap:Record<number, string>) => {
  let emoji = emojiMap[streak]

  if(!emoji){
    const emojisArray = Object.keys(emojiMap).map((value) => parseInt(value, 10))
    const maxSupportedNumber = emojisArray.reduce((max: number, current: number) => {
      return max < current ? current : max
    }, emojisArray[0])

    const minSupportedNumber = emojisArray.reduce((min: number, current: number) => {
      return min < current ? min : current
    }, emojisArray[0])

    if(streak > maxSupportedNumber){
      emoji = emojiMap[maxSupportedNumber]
    } else if(streak < minSupportedNumber) {
      emoji = emojiMap[minSupportedNumber]
    } else {
      let closestStreakEmoji = streak
      while(typeof emojiMap[closestStreakEmoji] === 'undefined'){
        closestStreakEmoji--
      }

      emoji = emojiMap[closestStreakEmoji]
    }
  }

  return emoji
}

export const getWinStreakEmoji = (streak: number) => {
  return getEmoji(streak, winStreakMap)
}

export const getLossStreakEmoji = (streak: number) => {
  return getEmoji(streak, lossStreakMap)
}


export const calcStreakNumber = (lastMatchWinValue: BooleanNumber, matches: Array<BooleanNumber>): number => {
  let streak = 0

  for(let i = 0; i < matches.length; i++){
    const isAMatchWin = matches[i]
    if(isAMatchWin !== lastMatchWinValue) break
    streak++
  }

  return streak
}

export const knownWinEmojisMap = {
  1: '😌',
  2: '😄',
  3: '🔥',
  4: '⚡',
  7: '🛡️'
}

export const knownLossEmojisMap: Record<number, string> = {
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
  return getEmoji(streak, knownWinEmojisMap)
}

export const getLossStreakEmoji = (streak: number) => {
  return getEmoji(streak, knownLossEmojisMap)
}
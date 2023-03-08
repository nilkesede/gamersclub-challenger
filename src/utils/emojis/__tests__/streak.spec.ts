import { getLossStreakEmoji, getWinStreakEmoji, knownLossEmojisMap, knownWinEmojisMap } from "../streak"


describe("streak", () => {

  describe("getWinStreakEmoji", () => {

    test("known emoji number", () => {
      expect(getWinStreakEmoji(2)).toEqual(knownWinEmojisMap[2])
    })

    test("emoji in a range", () => {
      expect(getWinStreakEmoji(5)).toEqual(knownWinEmojisMap[4])
    })

    test("beyond the max number", () => {
      expect(getWinStreakEmoji(100)).toEqual(knownWinEmojisMap[7])
    })

    test("less than min number", () => {
      expect(getWinStreakEmoji(-1)).toEqual(knownWinEmojisMap[1])
    })
  })

  describe("getLossStreakEmoji", () => {

    test("known emoji number", () => {
      expect(getLossStreakEmoji(2)).toEqual(knownLossEmojisMap[2])
    })

    test("emoji in a range", () => {
      expect(getLossStreakEmoji(5)).toEqual(knownLossEmojisMap[4])
    })

    test("beyond the max number", () => {
      expect(getLossStreakEmoji(100)).toEqual(knownLossEmojisMap[7])
    })

    test("less than min number", () => {
      expect(getLossStreakEmoji(-1)).toEqual(knownLossEmojisMap[1])
    })
  })
})
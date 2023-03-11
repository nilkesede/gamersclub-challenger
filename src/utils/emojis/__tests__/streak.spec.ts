import { getLossStreakEmoji, getWinStreakEmoji, lossStreakMap, winStreakMap } from "../streak"


describe("streak", () => {

  describe("getWinStreakEmoji", () => {

    test("known emoji number", () => {
      expect(getWinStreakEmoji(2)).toEqual(winStreakMap[2])
    })

    test("emoji in a range", () => {
      expect(getWinStreakEmoji(5)).toEqual(winStreakMap[4])
    })

    test("beyond the max number", () => {
      expect(getWinStreakEmoji(100)).toEqual(winStreakMap[7])
    })

    test("less than min number", () => {
      expect(getWinStreakEmoji(-1)).toEqual(winStreakMap[1])
    })
  })

  describe("getLossStreakEmoji", () => {

    test("known emoji number", () => {
      expect(getLossStreakEmoji(2)).toEqual(lossStreakMap[2])
    })

    test("emoji in a range", () => {
      expect(getLossStreakEmoji(5)).toEqual(lossStreakMap[4])
    })

    test("beyond the max number", () => {
      expect(getLossStreakEmoji(100)).toEqual(lossStreakMap[7])
    })

    test("less than min number", () => {
      expect(getLossStreakEmoji(-1)).toEqual(lossStreakMap[1])
    })
  })
})
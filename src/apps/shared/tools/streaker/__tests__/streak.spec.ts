import { BooleanNumber } from "@/apps/shared/extras/gc/types/BooleanNumber"
import { calcStreakNumber, getLossStreakEmoji, getWinStreakEmoji, lossStreakMap, winStreakMap } from ".."


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

  describe("calcStreakNumber", () => {
    test("ease win streak", () => {
      expect(calcStreakNumber(1, [1, 1, 1, 1])).toBe(4)
    })

    test("win streak after one loss", () => {
      expect(calcStreakNumber(1, [0, 1, 1, 1].reverse() as BooleanNumber[])).toBe(3)
    })

    test("win streak after loss streak", () => {
      expect(calcStreakNumber(1, [0, 0, 1, 1, 1].reverse() as BooleanNumber[])).toBe(3)
    })

    test("win streak after one win and loss streak", () => {
      expect(calcStreakNumber(1, [1, 0, 0, 1, 1].reverse() as BooleanNumber[])).toBe(2)
    })

    test("ease loss streak", () => {
      expect(calcStreakNumber(0, [0, 0, 0, 0])).toBe(4)
    })

    test("loss streak after one win", () => {
      expect(calcStreakNumber(0, [1, 0, 0, 0].reverse() as BooleanNumber[])).toBe(3)
    })

    test("loss streak after win streak", () => {
      expect(calcStreakNumber(0, [1, 1, 0, 0].reverse() as BooleanNumber[])).toBe(2)
    })

    test("loss streak after one loss and win streak", () => {
      expect(calcStreakNumber(0, [0, 1, 1, 0, 0].reverse() as BooleanNumber[])).toBe(2)
    })
  })
})
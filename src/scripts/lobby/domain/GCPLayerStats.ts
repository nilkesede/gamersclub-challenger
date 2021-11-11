
type BooleanNumber = 0 | 1
type GCMatchType = "lobby" | "ranked"

export interface GCPlayerStats {
  character: {
    totalHits: number,
    hitbox: {
      chest: number,
      head: number,
      leftArm: number,
      leftLeg: number,
      rightArm: number
    },

    matches: {
      loss: number,
      matches: number,
      wins: number
    },

    monthMatches: GCMonthMatch[],
    months: string[],

    monthRating: {
      max: number,
      min: number,
    }
  }
}

export interface GCMonthMatch {
  id: number | string
  map: string
  ratingDiff: number
  ratingPlayer: number
  scoreA: number
  scoreB: number
  teamNameA: string
  teamNameB: string
  type: GCMatchType
  win: BooleanNumber
}
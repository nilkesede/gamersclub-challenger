import { AnalyticsEvent } from "./types"

export const staticEvents = {
  START_AUTOMATIC_CHALLENGER: {
    category: 'lobbyChallenge',
    action: 'click',
    label: 'Start automatic challenger'
  },

  STOP_AUTOMATIC_CHALLENGER: {
    category: 'lobbyChallenge',
    action: 'click',
    label: 'Stop automatic challenger'
  },

  FILTER_BY_LOBBY_PLAYER_NAME: {
    category: 'lobbySearch',
    action: 'keyup',
    label: `Filter by player name`,
  },
}

export const dynamicEvents = ({ value }: { value: string | number }): Record<string, AnalyticsEvent> => {
  return {
    FILTER_BY_KDR: {
      category: 'lobbySearch',
      action: 'change',
      label: `Filter by KDR ${value}`,
      value,
    },

    TOGGLE_PLAYER_MARK: {
      category: 'playerMark',
      action: 'click',
      label: `Toggle player mark ${value}`,
      value
    }
  }
}
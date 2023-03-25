import { GCInitialPlayerStats } from "@/utils/gc/types/GCInitialPlayerStats";
import { GCPlayerStatsHistory } from "@/utils/gc/types/GCPlayerStatsHistory";
import analytics from "../../analytics";
import { gcUrls } from "./resources/urls/gcUrls";


export const userAPI = {
  getById(id: string){
    return fetch(gcUrls.player(id))
      .then(response => response.text())
      .catch(analytics.sendError)
  },

  boxInitialMatches(id: string): Promise<GCInitialPlayerStats> {
    return fetch(gcUrls.boxInitialMatches(id))
      .then(response => response.json())
      .catch(analytics.sendError)
  },

  boxMatchesHistory(id: string): Promise<GCPlayerStatsHistory> {
    return fetch(gcUrls.boxMatchesHistory(id))
    .then(response => response.json())
    .catch(analytics.sendError)
  }
}


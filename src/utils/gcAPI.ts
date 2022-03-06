import analytics from "./analytics";
import { gcUrls } from "./gcUrls";


export const userAPI = {
  getById(id: string){
    return fetch(gcUrls.player(id))
      .then(response => response.text())
      .catch(analytics.sendError)
  },

  boxInitialMatches(id: string){
    return fetch(gcUrls.boxInitialMatches(id))
      .then(response => response.json())
      .catch(analytics.sendError)
  },

  boxMatchesHistory(id: string) {
    return fetch(gcUrls.boxMatchesHistory(id))
    .then(response => response.json())
    .catch(analytics.sendError)
  }
}


import { GCCFilters } from "@/scripts/lobby/domain/gccFilters";

export interface GCCOptions {
  showLobbiesKDR: boolean,
  showMyLobbyKDR: boolean,
  showChallengeListKDR: boolean,
  enableKDRFilter: boolean,
  enableNameFilter: boolean
}

export interface GCCStorageSettings {
  filters: Partial<GCCFilters>
  options: Partial<GCCOptions>
}
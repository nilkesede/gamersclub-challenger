import { GCCFilters } from "@/scripts/lobby/domain/gccFilters";

export interface GCCOptions {
  showLobbiesKDR: boolean,
  showMyLobbyKDR: boolean,
  showChallengeListKDR: boolean,
  enableKDRFilter: boolean,
  enableNameFilter: boolean
  enableAutomaticChallengeButton: boolean
  enable3DGCCardEffect: boolean
  enableToPinLobbies: boolean
  enableAutoReady: boolean
}

export type GCCOptionsKey = keyof GCCOptions;

export interface GCCStorageSettings {
  filters: Partial<GCCFilters>
  options: Partial<GCCOptions>
  betaTesters: Array<string>
}
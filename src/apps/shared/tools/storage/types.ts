import { GCCFilters } from "@/apps/contentScripts/lobby/types/gccFilters";
import { GCCMark } from "@/apps/contentScripts/lobby/types/GCCMark";

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
  enablePlayerProgress: boolean
}

export type GCCOptionsKey = keyof GCCOptions;

export interface GCCStorageSettings {
  filters: Partial<GCCFilters>
  options: Partial<GCCOptions>
  betaTesters: Array<string>
  custom: {
    players: Record<string,{
      name?: string
      marks?: Partial<Record<GCCMark, boolean>>
    }>
  }
}

export interface AnalyticsEvent {
  category: string
  label: string
  action: string
  value?: string | number
}

export type AnalyticsCustomDimention = 'gcId' | 'gcNickname' | 'gcLevel' | 'kdrFilterNumber' | 'enableNameFilter' | 'enable3DGCCardEffect' | 'enableAutoReady' | 'enablePlayerProgress'
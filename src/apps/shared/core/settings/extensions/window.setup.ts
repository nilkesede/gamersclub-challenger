
export { }
declare global {

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface browser {}
  export interface Window {
    ga: any,
    chrome: any,
    userId: number | string,
    localStorage: any,
    browser: any,
    gcChallenger?: any
  }

  interface String {
    cleanCSSSelector(): string;
  }

  interface Number {
    percentageOf(totalValue: number, fixedDecimal?: number): string;
    percentage(partialValue: number, fixedDecimal?: number): string;
  }

  interface Array<T> {
    groupByKey(key: string): Record<string, Array<T>>
  }
}

// @ts-ignore
window.chrome ? (window.browser = window.chrome) : (window.browser = browser)
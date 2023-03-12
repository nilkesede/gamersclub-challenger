
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

  interface Array<T> {
    groupByKey(key: string): Record<string, Array<T>>
  }
}

// @ts-ignore
window.chrome ? (window.browser = window.chrome) : (window.browser = browser)


Array.prototype.groupByKey = function (key) { return this.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {}) }
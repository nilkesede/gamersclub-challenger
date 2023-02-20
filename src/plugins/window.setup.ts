
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
    gcc?: any
  }

  interface String {
    cleanCSSSelector(): string;
  }
}

// @ts-ignore
window.chrome ? (window.browser = window.chrome) : (window.browser = browser)

// @ts-ignore
Array.prototype.groupByKey = function (key) { return this.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {}) }
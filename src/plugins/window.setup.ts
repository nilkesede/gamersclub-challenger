
export {}
declare global {
  export interface Window {
    ga: any,
    chrome: any,
    userId: number | string,
    localStorage: any,
    browser: any,
    gcc?: any
  }
}

window.chrome ? (window.browser = window.chrome) : void 0

// @ts-ignore
Array.prototype.groupByKey = function(key){ return this.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {}) }


export {}
declare global {
  export interface Window {
    ga: any,
    chrome: any,
    userId: number | string,
    localStorage: any,
    browser: any
  }
}

window.chrome ? (window.browser = window.chrome) : void 0
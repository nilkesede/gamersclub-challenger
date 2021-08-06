import Logger from "js-logger";
import analytics from "../analytics";
import { GCCStorageSettings } from "./types";

class BrowserStorage {

  settingsKey = 'gccSettings'
  settings: GCCStorageSettings | undefined;

  async setup() {
    try {
      this.settings = await this.get()
      Logger.debug('Loaded settings', JSON.stringify(this.settings))
    } catch(err) {
      analytics.sendError(err)
    }
  }

  get(key: string = this.settingsKey): Promise<GCCStorageSettings> {
    return new Promise((resolve, reject) => {
      try{
        if(window.browser.storage){
          window.browser.storage.sync.get(key, function(response: any){
            resolve(response)
          });
        } else {
          resolve( JSON.parse(window.localStorage.getItem(key)) );
        }
      } catch(err){
        reject(err);
      }
    })
  }

  set(key: string, data: any){
    return new Promise((resolve, reject) => {
      try{
        if(window.browser.storage){
          window.browser.storage.sync.set({[key]: data}, function(response: any){
            resolve(response)
          });
        } else {
          resolve(  JSON.stringify(window.localStorage.setItem(key, data)) );
        }
      } catch(err){
        reject(err);
      }
    })
  }

  updateSettings() {
    this.set(this.settingsKey, { ...this.settings })
    Logger.debug('Update settings', JSON.stringify(this.settings))
  }

  remove(key: string){
    return new Promise((resolve, reject) => {
      try{
        if(window.browser.storage){
          window.browser.storage.sync.remove(key, function(response: any){
            resolve(response)
          });
        } else {
          resolve( window.localStorage.removeItem(key) );
        }
      } catch(err){
        reject(err);
      }
    })
  }
}

export default new BrowserStorage()
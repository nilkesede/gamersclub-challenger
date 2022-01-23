import Logger from "js-logger";
import analytics from "../analytics";
import { GCCStorageSettings } from "./types";

class BrowserStorage {

  settingsKey = 'gccSettings'
  settings: Partial<GCCStorageSettings> = {};
  defaultSettings: Partial<GCCStorageSettings> = {
    filters: {
      kdr: 1.2
    },
    options: {
      showLobbiesKDR: true,
      showMyLobbyKDR: true,
      showChallengeListKDR: true,
      enableNameFilter: false,
      enableKDRFilter: true,
      enableAutomaticChallengeButton: true,
      enable3DGCCardEffect: true
    }
  }

  async setup() {
    try {
      const settings = await this.get()
      if(settings && Object.keys(settings).length) {
        Object.assign(this.settings, this.defaultSettings, settings)
        Logger.debug('⚙️ Loaded settings', JSON.stringify(settings))
      } else {
        Object.assign(this.settings, this.defaultSettings)
        Logger.debug('⚙️ Setup settings as defaults', JSON.stringify(this.settings))
      }
    } catch(err) {
      analytics.sendError(err as string)
      Logger.error(err)
    }
  }

  get(key?: string | string[]): Promise<GCCStorageSettings> {
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

  set(data: any){
    return new Promise((resolve, reject) => {
      try{
        if(window.browser.storage) {
          window.browser.storage.sync.set(data, function(response: any) {
            window.browser.runtime.lastError ? reject(window.browser.runtime.lastError) : void 0
            resolve(response)
          });
        }
      } catch(err){
        reject(err);
      }
    })
  }

  updateSettings() {
    this.set(this.settings)
    Logger.debug('⚙️ Update settings', JSON.stringify(this.settings))
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
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */

import Logger from "js-logger"
import $ from 'jquery'

let missingGCCElements = []
let foundGCCElements = []

function checkSelectors(selectors, parentKey = '') {
  for (const key in selectors) {
    switch (typeof selectors[key]) {
      case 'object':
        checkSelectors(selectors[key], parentKey ? `${parentKey}.${key}` : key)
        break;
      case 'string':
        const $element = $(selectors[key])
        const result = {
          key,
          parentSelector: parentKey,
          selector: selectors[key],
          element: $element
        }

        if ($element?.length > 0) {
          foundGCCElements.push(result)
        } else {
          missingGCCElements.push(result)
        }
    }
  }
}

export default function checkGCSelectors(selectors, parentKey = '') {
  missingGCCElements = []
  foundGCCElements = []

  checkSelectors(selectors, parentKey)

  Logger.debug('🩺 [checkGCSelectors] 🟢 foundElements', foundGCCElements.length, foundGCCElements)
  Logger.debug('🩺 [checkGCSelectors] 🟡 missingElements', missingGCCElements.length, missingGCCElements)

  return {
    found: foundGCCElements,
    missing: missingGCCElements
  }
}
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */

let missingElements = []
let foundElements = []

function checkGCSelectors(selectors, parentKey = '') {
  for (const key in selectors) {
    switch (typeof selectors[key]) {
      case 'object':
        checkGCSelectors(selectors[key], parentKey ? `${parentKey}.${key}` : key)
        break;
      case 'string':
        const $element = $(selectors[key])
        const result = {
          key,
          parentSelector: parentKey,
          selector: selectors[key],
          element: $element
        }

        if ($element.length > 0) {
          foundElements.push(result)
        } else {
          missingElements.push(result)
        }
    }
  }
}
import { MAElementDescription } from './MAElementDescription.js'

class MAStringDescription extends MAElementDescription {
  static isAbstract() {
    return false
  }

  static defaultKind() {
    return String
  }

  isSortable() {
    return true
  }
}

function init() {
  const stringDescription = new MAStringDescription()

  console.log('===MAStringDescription===')
  console.log('isSortable:', stringDescription.isSortable())
  console.log('===MAStringDescription end===\n')
}

init()
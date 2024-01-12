import { MANumberDescription } from './MANumberDescription.js'

class MAIntDescription extends MANumberDescription {
  static isAbstract() {
    return false
  }

  static defaultKind() {
    return Number
  }
}

function init() {
  const intDescription = new MAIntDescription()

  console.log('===MAIntDescription===')
  console.log(intDescription)
  console.log('===MAIntDescription end===\n')
}

init()
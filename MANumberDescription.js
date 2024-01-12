import { MAMagnitudeDescription } from './MAMagnitudeDescription.js'

export class MANumberDescription extends MAMagnitudeDescription {
  bePositive() {
    this.addCondition('MACondition.model > 0', 'Positive number is required')
  }
}

function init() {
  const numberDescription = new MANumberDescription()

  console.log('===MANumberDescription===')
  console.log('bePositive:', numberDescription.bePositive())
  console.log('===MANumberDescription end===\n')
}

init()
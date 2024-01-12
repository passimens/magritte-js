import { MAElementDescription } from './MAElementDescription.js'

export class MAMagnitudeDescription extends MAElementDescription {
  isSortable() {
    return true
  }

  isWithinRange(val) {
    return (this.min === null || this.min <= val) && (this.max === null || this.max >= val)
  }

  get max() {
    try {
      return this._max
    } catch (error) {
      return this.defaultMax()
    }
  }

  set max(val) {
    this._max = val
  }

  static defaultMax() {
    return null
  }

  get min() {
    try {
      return this._min
    } catch (error) {
      return this.defaultMin()
    }
  }

  set min(val) {
    this._min = val
  }

  static defaultMin() {
    return null
  }

  setMinMax(minVal, maxVal) {
    this.min = minVal
    this.max = maxVal
  }

  get rangeErrorMessage() {
    try {
      return this._rangeErrorMessage
    } catch (error) {
      console.log('error', error)
      const min = this.min
      const max = this.max

      if (min !== null) {
        if (max !== null) {
          return `Input must be between ${min} and ${max}`
        }
        return `Input must be above or equal to ${min}`
      }

      if (max !== null) {
        return `Input must be below or equal to ${max}`
      }

      return null
    }
  }

  set rangeErrorMessage(message) {
    this._rangeErrorMessage = message
  }
}

function init() {
  const magnitudeDescription = new MAMagnitudeDescription()

  magnitudeDescription.setMinMax(1, 10)

  console.log('===MAMagnitudeDescription===')
  console.log('isSortable:', magnitudeDescription.isSortable())
  console.log('isWithinRange:', magnitudeDescription.isWithinRange(5))
  console.log('min:', magnitudeDescription.min)
  console.log('max:', magnitudeDescription.max)
  console.log('===MAMagnitudeDescription end===\n')
}

init()
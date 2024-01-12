class MAMagnitudeDescription extends MAElementDescription {
  magritteDescription() {
    const MAMagnitudeDescription_selfdesc = require('Magritte.descriptions.MAMagnitudeDescription_selfdesc')
    return MAMagnitudeDescription_selfdesc.magritteDescription(this, super.magritteDescription())
  }

  isSortable() {
    return true
  }

  isWithinRange(anObject) {
    return (this.min === null || this.min <= anObject) && (this.max === null || this.max >= anObject)
  }

  get max() {
    try {
      return this._max
    } catch (error) {
      return this.defaultMax()
    }
  }

  set max(anObjectOrNone) {
    this._max = anObjectOrNone
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

  set min(anObjectOrNone) {
    this._min = anObjectOrNone
  }

  static defaultMin() {
    return null
  }

  setMinMax(aMinimumObject, aMaximumObject) {
    this.min = aMinimumObject
    this.max = aMaximumObject
  }

  get rangeErrorMessage() {
    try {
      return this._rangeErrorMessage
    } catch (error) {
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

  set rangeErrorMessage(aString) {
    this._rangeErrorMessage = aString
  }

  _validateSpecific(model) {
    if (!this.isWithinRange(model)) {
      return [
        ...super._validateSpecific(model),
        new MARangeError(this.rangeErrorMessage, this)
      ]
    }

    return super._validateSpecific(model)
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitMagnitudeDescription(this)
  }
}
class MAMagnitudeDescription extends MAElementDescription {
  isSortable() {
    return true
  }

  isWithinRange(val) {
    return (this.min === null || this.min <= val) && (this.max === null || this.max >= val)
  }

  get max() {
    if (this._max === undefined) {
      return this.defaultMax()
    }

    return this._max
  }

  set max(val) {
    this._max = val
  }

  static defaultMax() {
    return null
  }

  get min() {
    if (this._min === undefined) {
      return this.defaultMin()
    }

    return this._min
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
    if (this._rangeErrorMessage) {
      return this._rangeErrorMessage
    }

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

  set rangeErrorMessage(message) {
    this._rangeErrorMessage = message
  }
}
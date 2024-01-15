class MAElementDescription extends MADescription {
  get default() {
    try {
      return this._default
    } catch (error) {
      return this.defaultDefault()
    }
  }

  get stringWriter() {
    try {
      return this._stringWriter
    } catch (error) {
      return null
    }
  }

  get stringReader() {
    try {
      return this._stringReader
    } catch (error) {
      return null
    }
  }

  set stringReader(data) {
    this._stringReader = data
  }

  set stringWriter(data) {
    this._stringWriter = data
  }

  set default(data) {
    this._default = data
  }

  static defaultDefault() {
    return null
  }
}

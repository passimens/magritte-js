class MAElementDescription extends MADescription {
  magritteDescription() {
    const MAElementDescription_selfdesc = require('Magritte.descriptions.MAElementDescription_selfdesc')
    return MAElementDescription_selfdesc.magritteDescription(this, super.magritteDescription())
  }

  get default() {
    try {
      return this._default
    } catch (error) {
      return this.defaultDefault()
    }
  }

  get defaultStringReader() {
    const MAStringReaderVisitor = require('Magritte.visitors.MAStringWriterReader_visitors.MAStringReaderVisitor')
    return MAStringReaderVisitor
  }

  get defaultStringWriter() {
    const MAStringWriterVisitor = require('Magritte.visitors.MAStringWriterReader_visitors.MAStringWriterVisitor')
    return MAStringWriterVisitor
  }

  get stringWriter() {
    try {
      return this._stringWriter
    } catch (error) {
      return this.defaultStringWriter()
    }
  }

  get stringReader() {
    try {
      return this._stringReader
    } catch (error) {
      return this.defaultStringReader()
    }
  }

  set stringReader(anObject) {
    this._stringReader = anObject
  }

  set stringWriter(anObject) {
    this._stringWriter = anObject
  }

  set default(anObject) {
    this._default = anObject
  }

  static defaultDefault() {
    return null
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitElementDescription(this)
  }

  writeString(aModel) {
    return this.stringWriter.write_str({ model: aModel, description: this })
  }

  readString(aModel) {
    return this.stringReader.read_str({ model: aModel, description: this })
  }
}
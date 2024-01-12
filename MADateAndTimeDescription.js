import datetime from datetime

class MADateAndTimeDescription extends MAMagnitudeDescription {
  static defaultKind() {
    return datetime
  }

  static isAbstract() {
    return false
  }
}
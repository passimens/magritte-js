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

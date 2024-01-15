class MANumberDescription extends MAMagnitudeDescription {
  bePositive() {
    this.addCondition('MACondition.model > 0', 'Positive number is required')
  }
}

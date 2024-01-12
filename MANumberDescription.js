class MANumberDescription extends MAMagnitudeDescription {
  bePositive() {
    this.addCondition(MACondition.model > 0, { label = 'Positive number is required' })
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitNumberDescription(this)
  }
}
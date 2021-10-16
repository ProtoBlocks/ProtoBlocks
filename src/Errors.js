class ProtocolConstructionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ProtocolConstructionError'
  }
}

module.exports.ProtocolConstructionError = ProtocolConstructionError

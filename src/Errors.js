class ProtocolConstructionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ProtocolConstructionError'
  }
}

class ProtocolExecutionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ProtocolExecutionError'
  }
}

module.exports.ProtocolConstructionError = ProtocolConstructionError
module.exports.ProtocolExecutionError = ProtocolExecutionError

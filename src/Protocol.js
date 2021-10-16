const { ProtocolConstructionError } = require('./Errors')

class Protocol {
  constructor (principals, steps) {
    this.principals = new Set()
    this.steps = new Map()

    for (const principal of principals) {
      if (typeof principal !== 'string') throw new ProtocolConstructionError('Principal name must be a string')
      if (this.principals.has(principal.toLowerCase())) throw new ProtocolConstructionError('Duplicate declaration of principal named "' + principal + '"')
      this.principals.add(principal.toLowerCase())
      this[principal] = new ProtocolInstance(this, principal.toLowerCase())
    }

    for (const step of steps) {
      if (typeof step.name !== 'string') throw new ProtocolConstructionError('Step name must be a string')
      const name = step.name.toLowerCase()
      if (this.steps.has(name)) throw new ProtocolConstructionError('Duplicate declaration of step named "' + name + '"')

      if (typeof step.origin !== 'string') throw new ProtocolConstructionError('Step origin must be a string')
      step.origin = step.origin.toLowerCase()
      if (!this.principals.has(step.origin)) throw new ProtocolConstructionError('Protocol does not contain principal "' + step.origin + '"')

      if (typeof step.destination !== 'string' && step.destination !== null) throw new ProtocolConstructionError('Step destination must be a string or null')
      step.destination = step.destination.toLowerCase()
      if (step.destination !== null && !this.principals.has(step.destination)) throw new ProtocolConstructionError('Protocol does not contain principal "' + step.destination + '"')

      if (typeof step.function !== 'function') throw new ProtocolConstructionError('Step function must be a function')

      this.steps.set(step.name, step)
    }
  }
}

class ProtocolInstance {
  constructor (protocol, principal) {
    if (!(protocol instanceof Protocol)) throw new ProtocolConstructionError('Protocol must be a Protocol object')
    this.protocol = protocol

    if (typeof principal !== 'string') throw new ProtocolConstructionError('Principal name must be a string')
    if (!protocol.principals.has(principal)) throw new ProtocolConstructionError('Protocol does not contain principal "' + principal + '"')
    this.principal = principal

    return this.run
  }

  run () {

  }
}

module.exports.Protocol = Protocol
module.exports.ProtocolInstance = Protocol

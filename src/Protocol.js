const { ProtocolConstructionError, ProtocolExecutionError } = require('./Errors')
const { Entity } = require('./Entity')
const uuid = require('uuid-random')

class Protocol {
  constructor ({ name, principals, steps }) {
    this.principals = new Map()
    this.steps = new Map()

    if (typeof name !== 'string') throw new ProtocolConstructionError('Protocol name must be a string')
    if (name.length === 0) throw new ProtocolConstructionError('Protocol name cannot be empty')
    this.name = name

    for (const principal of principals) {
      if (typeof principal !== 'object') throw new ProtocolConstructionError('Principal name must be an object')
      if (typeof principal.name !== 'string') throw new ProtocolConstructionError('Principal name must be a string')
      if (this.principals.has(principal.name.toLowerCase())) throw new ProtocolConstructionError('Duplicate declaration of principal named "' + principal + '"')
      if (principal.name.length === 0) throw new ProtocolConstructionError('Principal name cannot be empty')
      if (!Array.isArray(principal.inputs)) throw new ProtocolConstructionError('Principal inputs must be an array')
      if (!principal.inputs.every(s => typeof s === 'string')) throw new ProtocolConstructionError('Principal input name must be strings')
      principal.inputs = principal.inputs.map(s => s.toLowerCase())
      if ((new Set(principal.inputs)).size !== principal.inputs.length) throw new ProtocolConstructionError('Principal input names contain duplicates')

      this.principals.set(principal.name.toLowerCase(), principal)
      this[principal.name] = new ProtocolInstanceGenerator(this, principal.name.toLowerCase())
    }

    for (const step of steps) {
      if (typeof step !== 'object') throw new ProtocolConstructionError('Step name must be an object')
      if (typeof step.name !== 'string') throw new ProtocolConstructionError('Step name must be a string')
      step.name = step.name.toLowerCase()
      if (step.name.length === 0) throw new ProtocolConstructionError('Step name cannot be empty')
      if (step.name === 'input') throw new ProtocolConstructionError('Step name \'input\' is reserved')
      if (step.name === 'output') throw new ProtocolConstructionError('Step name \'output\' is reserved')
      if (step.name === 'id') throw new ProtocolConstructionError('Step name \'id\' is reserved')
      if (step.name === 'send') throw new ProtocolConstructionError('Step name \'send\' is reserved')

      if (this.steps.has(step.name)) throw new ProtocolConstructionError('Duplicate declaration of step named "' + step.name + '"')

      if (typeof step.origin !== 'string') throw new ProtocolConstructionError('Step origin must be a string')
      step.origin = step.origin.toLowerCase()
      if (!this.principals.has(step.origin)) throw new ProtocolConstructionError('Protocol does not contain principal "' + step.origin + '"')

      if (!Array.isArray(step.recipients)) throw new ProtocolConstructionError('Step recipients must be an array')
      if (!step.recipients.every(s => typeof s === 'string')) throw new ProtocolConstructionError('Step recipient name must be strings')
      step.recipients = step.recipients.map(s => s.toLowerCase())
      if ((new Set(step.recipients)).size !== step.recipients.length) throw new ProtocolConstructionError('Step recipient names contain duplicates')
      if (!step.recipients.every(s => this.principals.has(s))) throw new ProtocolConstructionError('Protocol does not contain principal in step recipients')

      if (typeof step.function !== 'function') throw new ProtocolConstructionError('Step function must be a function')

      this.steps.set(step.name, step)
    }
  }
}

class ProtocolInstanceGenerator {
  constructor (protocol, principal) {
    if (!(protocol instanceof Protocol)) throw new ProtocolConstructionError('Protocol must be a Protocol object')
    this.protocol = protocol
    if (typeof principal !== 'string') throw new ProtocolConstructionError('Principal name must be a string')
    if (!protocol.principals.has(principal)) throw new ProtocolConstructionError('Protocol does not contain principal "' + principal + '"')
    this.principal = principal

    return this.run.bind(this)
  }

  run (self, parties, inputs) {
    if (!(self instanceof Entity)) throw new ProtocolExecutionError('Self must be an Entity')
    if (typeof parties !== 'object' || Array.isArray(parties) || parties === null) throw new ProtocolExecutionError('Parties must be an object')
    if (typeof inputs !== 'object' || Array.isArray(inputs) || inputs === null) throw new ProtocolExecutionError('Inputs must be an object')

    const instance = new ProtocolInstance(this.protocol, this.principal)
    instance.parties[this.principal].Input = {}

    const expectedInputs = new Set(this.protocol.principals.get(this.principal).inputs)
    for (const [key, value] of Object.entries(inputs)) {
      if (!expectedInputs.has(key.toLowerCase())) throw new ProtocolExecutionError('Unexpected input: "' + key + '"')
      instance.parties[this.principal].Input[key] = value
    }
    for (const input of expectedInputs) {
      if (!instance.parties[this.principal].Input[input]) throw new ProtocolExecutionError('Missing required input: "' + input + '"')
    }

    parties[this.principal] = self

    const expectedParties = new Set(Array.from(this.protocol.principals.keys()))
    for (const [key, value] of Object.entries(parties)) {
      if (!expectedParties.has(key.toLowerCase())) throw new ProtocolExecutionError('Unexpected party: "' + key + '"')
      if (!(value instanceof Entity)) throw new ProtocolExecutionError('Party must be an Entity: "' + key + '"')
      if (value.Id) {
        if (typeof value.id !== 'string') throw new ProtocolExecutionError('Party ID must be a string')
        instance.parties[key.toLowerCase()].Id = key + '#' + value.Id
      } else {
        instance.parties[key.toLowerCase()].Id = key
      }
    }
    for (const party of expectedParties) {
      if (!instance.parties[party].Id) throw new ProtocolExecutionError('Missing required party: "' + party + '"')
    }

    return instance.run()
  }
}

class ProtocolInstance {
  constructor (protocol, principal) {
    if (!(protocol instanceof Protocol)) throw new ProtocolConstructionError('Protocol must be a Protocol object')
    this.protocol = protocol
    if (typeof principal !== 'string') throw new ProtocolConstructionError('Principal name must be a string')
    if (!protocol.principals.has(principal)) throw new ProtocolConstructionError('Protocol does not contain principal "' + principal + '"')
    this.principal = principal

    this.parties = {}
    protocol.principals.forEach((value, key) => {
      this.parties[key] = {}
    })

    this.id = uuid()
  }

  run () {

  }
}

module.exports.Protocol = Protocol
module.exports.ProtocolInstance = ProtocolInstance
module.exports.ProtocolInstanceGenerator = ProtocolInstanceGenerator

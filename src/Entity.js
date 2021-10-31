const uuid = require('uuid-random')
const { ProtocolInstance } = require('./Protocol')
const { ProtocolExecutionError } = require('./Errors')

class Entity {
  constructor (name) {
    this.name = name
    this.instances = {}
  }

  register (instance) {
    if (!(instance instanceof ProtocolInstance)) throw new ProtocolExecutionError('instance must be of type ProtocolInstance')
    this.instances[instance.id] = instance
  }
}

class LocalEntity extends Entity {
  constructor (name) {
    super(name)
    this.id = uuid()
  }
}

module.exports.Entity = Entity
module.exports.LocalEntity = LocalEntity

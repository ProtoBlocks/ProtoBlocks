const crypto = require('crypto')
const uuid = require('uuid-random')

module.exports.hash = (str) => {
  return crypto.createHash('sha256').update(str).digest('hex')
}

module.exports.nonce = uuid

module.exports.timestamp = (granularity = 0) => {
  const time = Date.now()
  return (time - (time % granularity)).toString()
}

module.exports.encrypt = (plaintext, key) => {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, 'BDA30EGDH1578F81')
  let crypted = cipher.update(plaintext, 'ascii', 'base64')
  crypted += cipher.final('base64')
  return crypted
}

module.exports.decrypt = (ciphertext, key) => {
  try {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, 'BDA30EGDH1578F81')
    let decoded = decipher.update(ciphertext, 'base64', 'ascii')
    decoded += decipher.final('ascii')
    return decoded
  } catch (e) {
    return false
  }
}

module.exports.keygen = () => {
  return crypto.randomBytes(8).toString('hex')
}

module.exports.keypairgen = () => {
  return crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })
}

module.exports.sign = (message, key) => {
  return crypto.sign('SHA256', Buffer.from(message), key).toString('base64')
}

module.exports.verify = (message, signature, key) => {
  return crypto.verify('SHA256', Buffer.from(message), key, Buffer.from(signature, 'base64'))
}

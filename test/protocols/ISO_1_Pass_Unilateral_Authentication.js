const { Protocol, timestamp, encrypt, decrypt } = require('../../src')

/* eslint camelcase: "off" */
const ISO_1_Pass_Unilateral_Authentication = new Protocol({
  name: 'ISO_1_Pass_Unilateral_Authentication',
  principals: [{
    name: 'Prover',
    inputs: ['SecretKey']
  }, {
    name: 'Verifier',
    inputs: ['SecretKey']
  }],
  steps: [{
    origin: 'Prover',
    recipients: ['Verifier'],
    name: 'Prove',
    function: async (Prover, Verifier) => {
      const Timestamp = timestamp(10000)
      const Ciphertext = encrypt(Timestamp + Verifier.Id, Prover.Input.SecretKey)
      Verifier.send({
        Ciphertext: Ciphertext
      })
    }
  }, {
    origin: 'Verifier',
    recipients: [],
    name: 'Verify',
    function: async (Prover, Verifier) => {
      const Timestamp = timestamp(10000)
      const Plaintext = decrypt(Prover.Response.Ciphertext, Verifier.Input.SecretKey)
      return Plaintext === Timestamp + Verifier.Id
    }
  }]
})

module.exports = ISO_1_Pass_Unilateral_Authentication

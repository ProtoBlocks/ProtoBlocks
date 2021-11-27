const { Protocol, encrypt, decrypt, nonce } = require('../../src')

/* eslint camelcase: "off" */
const Nonce_Return_2_Pass_Unilateral_Authentication = new Protocol({
  name: 'Nonce_Return_2_Pass_Unilateral_Authentication',
  principals: [{
    name: 'Prover',
    inputs: ['SecretKey']
  }, {
    name: 'Verifier',
    inputs: ['SecretKey']
  }],
  steps: [{
    origin: 'Verifier',
    recipients: ['Prover'],
    name: 'Challenge',
    function: async (Verifier, Prover) => {
      const Nonce = nonce()
      const Ciphertext = encrypt(Nonce, Verifier.Input.SecretKey)
      Prover.send({
        Ciphertext: Ciphertext
      })
    }
  }, {
    origin: 'Prover',
    recipients: ['Verifier'],
    name: 'Response',
    function: async (Prover, Verifier) => {
      const Plaintext = decrypt(Verifier.Challenge.Ciphertext, Prover.Input.SecretKey)
      Verifier.send({
        Plaintext: Plaintext
      })
    }
  }, {
    origin: 'Verifier',
    recipients: [],
    name: 'Verify',
    function: async (Prover, Verifier) => {
      const Nonce = decrypt(Verifier.Challenge.Ciphertext, Verifier.Input.SecretKey)
      return Prover.Response.Plaintext === Nonce
    }
  }]
})

module.exports = Nonce_Return_2_Pass_Unilateral_Authentication

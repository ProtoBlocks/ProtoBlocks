const { Protocol, encrypt, decrypt } = require('../../src')

/* eslint camelcase: "off" */
const Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication = new Protocol({
  name: 'Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication',
  principals: [{
    name: 'Prover',
    inputs: ['PrivateKey']
  }, {
    name: 'Verifier',
    inputs: ['PublicKey']
  }],
  steps: [{
    origin: 'Verifier',
    recipients: ['Prover'],
    name: 'Challenge',
    function: async (Prover, Verifier) => {
      const Nonce = "12345"
      const Ciphertext = encrypt(Nonce, Verifier.Input.PublicKey)
      Prover.send({
        Ciphertext: Ciphertext
      })
    }
  }, {
    origin: 'Prover',
    recipients: ['Verifier'],
    name: 'Response',
    function: async (Prover, Verifier) => {
      const Plaintext = decrypt(Verifier.Challenge.Ciphertext, Prover.Input.PrivateKey)
      Verifier.send({
        Plaintext: Plaintext
      })
    }
  }, {
    origin: 'Verifier',
    recipients: [],
    name: 'Verify',
    function: async (Prover, Verifier) => {
      const Nonce = "12345"
      return Prover.Response.Plaintext === Nonce
    }
  }]
})

module.exports = Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication

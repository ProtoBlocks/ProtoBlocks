const { Protocol, sign, verify, nonce } = require('../../src')

/* eslint camelcase: "off" */
const ISO_Public_Key_2_Pass_Unilateral_Authentication = new Protocol({
  name: 'ISO_Public_Key_2_Pass_Unilateral_Authentication',
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
    function: async (Verifier, Prover) => {
      const Nonce = nonce()
      Prover.send({
        Nonce: Nonce
      })
    }
  }, {
    origin: 'Prover',
    recipients: ['Verifier'],
    name: 'Response',
    function: async (Prover, Verifier) => {
      const Signature = sign(Verifier.Challenge.Nonce + Verifier.Id, Prover.Input.PrivateKey)
      Verifier.send({
        Signature: Signature
      })
    }
  }, {
    origin: 'Verifier',
    recipients: [],
    name: 'Verify',
    function: async Verifier => {
      const Verify = verify(Verifier.Challenge.Nonce + Verifier.Id, Verifier.Input.PublicKey)
      return Verify
    }
  }]
})

module.exports = ISO_Public_Key_2_Pass_Unilateral_Authentication

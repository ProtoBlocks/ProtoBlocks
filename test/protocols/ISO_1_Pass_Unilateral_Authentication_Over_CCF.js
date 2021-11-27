const { Protocol, timestamp, hash } = require('../../src')

/* eslint camelcase: "off" */
const ISO_1_Pass_Unilateral_Authentication_Over_CCF = new Protocol({
  name: 'ISO_1_Pass_Unilateral_Authentication_Over_CCF',
  principals: [{
    name: 'Prover',
    inputs: ['Secret']
  }, {
    name: 'Verifier',
    inputs: ['Secret']
  }],
  steps: [{
    origin: 'Prover',
    recipients: ['Verifier'],
    name: 'Prove',
    function: async (Prover, Verifier) => {
      const Timestamp = timestamp(10000)
      const Hash = hash(Timestamp + Verifier.Id + Prover.Input.Secret)
      Verifier.send({
        Hash: Hash
      })
    }
  }, {
    origin: 'Verifier',
    recipients: [],
    name: 'Verify',
    function: async (Prover, Verifier) => {
      const Timestamp = timestamp(10000)
      const Hash = hash(Timestamp + Verifier.Id + Verifier.Input.Secret)
      return Hash === Prover.Response.Hash
    }
  }]
})

module.exports = ISO_1_Pass_Unilateral_Authentication_Over_CCF

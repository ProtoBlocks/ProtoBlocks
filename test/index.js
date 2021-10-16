const { Protocol } = require('../src/index.js')
const should = require('chai').should()

suite('ISO_2_Pass_Unilateral_Authentication_Over_CCF', () => {
  suiteSetup(() => {
    this.protocol = new Protocol(
      ["Prover", "Verifier"],
      [
        {origin: "Verifier", destination: "Prover", name: "Challenge", function: (Prover, Verifier) => {
          const nonce = UUIDv4();
          Verifier.send("nonce", nonce);
        }},
        {origin: "Prover", destination: "Verifier", name: "Response", function: (Prover, Verifier) => {
          const hash = SHA256(Challenge.nonce + Verifier.id)
          Verifier.send("hash", hash);
        }}
      ]
    );
  })

  test('runners', () => {
    this.protocol.Prover.should.be.a('function');
    this.protocol.Verifier.should.be.a('function');
  })
})

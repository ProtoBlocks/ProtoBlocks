const { Protocol, hash, nonce } = require('../src');
const should = require('chai').should()


suite ('ISO_2_Pass_Unilateral_Authentication_Over_CCF', () => {
  suiteSetup(() => {
    this.protocol = new Protocol(
      {
        name: 'ISO_2_Pass_Unilateral_Authentication_Over_CCF',
        principals: [
          {name: "Prover", inputs: ["Secret"]},
          {name: "Verifier", inputs: ["Secret"]}
        ],
        steps: [
          {origin: "Verifier", recipients: ["Prover"], name: "Challenge", function: (Prover, Verifier) => {
            const Nonce = nonce();
            Verifier.send({"Nonce": Nonce});
          }},
          {origin: "Prover", recipients: ["Verifier"], name: "Response", function: (Prover, Verifier) => {
            const Hash = hash(Challenge.Nonce + Verifier.Id + Prover.Input.Secret);
            Verifier.send({"Hash": Hash});
          }}
        ]
      }
    );

    this.alice = new LocalEntity("Alice");
    this.bob = new LocalEntity("Bob");
  })

  test('run', () => {
    ISO_2_Pass_Unilateral_Authentication_Over_CCF.Prover(this.alice, {Verifier: this.bob});
  })
})

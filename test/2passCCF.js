const { Protocol, hash, nonce, LocalEntity } = require('../src');
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
          {origin: "Verifier", recipients: ["Prover"], name: "Challenge", function: async (Prover, Verifier) => {
            const Nonce = nonce();
            Prover.send({"Nonce": Nonce});
          }},
          {origin: "Prover", recipients: ["Verifier"], name: "Response", function: async (Prover, Verifier) => {
            const Hash = hash(Verifier.Challenge.Nonce + Verifier.Id + Prover.Input.Secret);
            Verifier.send({"Hash": Hash});
          }},
          {origin: "Verifier", recipients: [], name: "Verify", function: async (Prover, Verifier) => {
            const Hash = hash(Verifier.Challenge.Nonce + Verifier.Id + Verifier.Input.Secret);
            return (Hash === Prover.Response.Hash);
          }}
        ]
      }
    );
  })

  test('valid', async () => {
    const alice = new LocalEntity("Alice");
    const bob = new LocalEntity("Bob");

    const secret = nonce();
    this.protocol.Prover(bob, {Verifier: alice}, {Secret: secret})
    const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: secret})

    result.should.be.true;
  })

  test('invalid', async () => {
    const alice = new LocalEntity("Alice");
    const bob = new LocalEntity("Bob");

    this.protocol.Prover(bob, {Verifier: alice}, {Secret: nonce()})
    const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: nonce()})

    result.should.be.false;
  })
})

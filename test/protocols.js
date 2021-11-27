const should = require('chai').should()
const { LocalEntity, nonce } = require('../src');

suite ('ISO_1_Pass_Unilateral_Authentication_Over_CCF', () => {
  suiteSetup(() => { this.protocol = require('./protocols/ISO_1_Pass_Unilateral_Authentication_Over_CCF') })

  test('valid', async () => {

  })
})

suite ('ISO_1_Pass_Unilateral_Authentication', () => {
  suiteSetup(() => { this.protocol = require('./protocols/ISO_1_Pass_Unilateral_Authentication') })

  test('valid', async () => {

  })
})

suite ('ISO_2_Pass_Unilateral_Authentication_Over_CCF', () => {
  suiteSetup(() => { this.protocol = require('./protocols/ISO_2_Pass_Unilateral_Authentication_Over_CCF') })

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

suite ('ISO_Public_Key_1_Pass_Unilateral_Authentication', () => {
  suiteSetup(() => { this.protocol = require('./protocols/ISO_Public_Key_1_Pass_Unilateral_Authentication') })

  test('valid', async () => {

  })
})

suite ('ISO_Public_Key_2_Pass_Unilateral_Authentication', () => {
  suiteSetup(() => { this.protocol = require('./protocols/ISO_Public_Key_2_Pass_Unilateral_Authentication') })

  test('valid', async () => {

  })
})

suite ('Nonce_Return_2_Pass_Unilateral_Authentication', () => {
  suiteSetup(() => { this.protocol = require('./protocols/Nonce_Return_2_Pass_Unilateral_Authentication') })

  test('valid', async () => {

  })
})

suite ('Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication', () => {
  suiteSetup(() => { this.protocol = require('./protocols/Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication') })

  test('valid', async () => {

  })
})
